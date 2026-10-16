import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { AuditServicePort, AccountAuditEventType } from '../../domain/ports/audit.service.port';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { CreateAccountDto, UpdateAccountStatusDto, AccountResponseDto } from './account.dto';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
    @Inject('AuditServicePort')
    private readonly auditService: AuditServicePort,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new bank account', description: 'Creates a new bank account with idempotency support based on account number' })
  @ApiResponse({ status: 201, description: 'Account created successfully', type: AccountResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 409, description: 'Account with given account number already exists (idempotent)' })
  @ApiBody({ type: CreateAccountDto })
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
    this.logger.log(`Creating account for customer: ${createAccountDto.customerId}`);

    const existingAccount = await this.accountRepository.findByAccountNumber(createAccountDto.accountNumber);
    if (existingAccount) {
      this.logger.warn(`Account already exists with number: ${createAccountDto.accountNumber}`);
      return this.toResponseDto(existingAccount);
    }

    const now = new Date();
    const account = new Account(
      uuidv4(),
      createAccountDto.accountNumber,
      createAccountDto.customerId,
      createAccountDto.accountType || AccountType.CHECKING,
      createAccountDto.initialBalance || 0,
      AccountStatus.ACTIVE,
      now,
      now,
    );

    const createdAccount = await this.accountRepository.create(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        createdAccount.id,
        createdAccount.accountNumber,
        createdAccount.customerId,
        createAccountDto.userId || 'system',
        AccountAuditEventType.ACCOUNT_CREATED,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    this.logger.log(`Account created successfully: ${createdAccount.id}`);
    return this.toResponseDto(createdAccount);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiResponse({ status: 200, description: 'Account found', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async getAccountById(@Param('id') id: string): Promise<AccountResponseDto> {
    this.logger.debug(`Fetching account by id: ${id}`);
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return this.toResponseDto(account);
  }

  @Get('number/:accountNumber')
  @ApiOperation({ summary: 'Get account by account number' })
  @ApiResponse({ status: 200, description: 'Account found', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'accountNumber', description: 'Account number' })
  async getAccountByNumber(@Param('accountNumber') accountNumber: string): Promise<AccountResponseDto> {
    this.logger.debug(`Fetching account by number: ${accountNumber}`);
    const account = await this.accountRepository.findByAccountNumber(accountNumber);

    if (!account) {
      throw new NotFoundException(`Account with number ${accountNumber} not found`);
    }

    return this.toResponseDto(account);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get all accounts for a customer' })
  @ApiResponse({ status: 200, description: 'List of accounts', type: [AccountResponseDto] })
  @ApiParam({ name: 'customerId', description: 'Customer UUID' })
  async getAccountsByCustomer(@Param('customerId') customerId: string): Promise<AccountResponseDto[]> {
    this.logger.debug(`Fetching accounts for customer: ${customerId}`);
    const accounts = await this.accountRepository.findByCustomerId(customerId);
    return accounts.map((account) => this.toResponseDto(account));
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update account status' })
  @ApiResponse({ status: 200, description: 'Account status updated', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  @ApiBody({ type: UpdateAccountStatusDto })
  async updateAccountStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateAccountStatusDto,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Updating status for account: ${id} to ${updateDto.status}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    switch (updateDto.status) {
      case AccountStatus.ACTIVE:
        account.activate();
        break;
      case AccountStatus.FROZEN:
        account.freeze();
        break;
      case AccountStatus.CLOSED:
        account.close();
        break;
      default:
        throw new BadRequestException(`Invalid status: ${updateDto.status}`);
    }

    const updatedAccount = await this.accountRepository.update(account);

    try {
      const eventType =
        updateDto.status === AccountStatus.ACTIVE
          ? AccountAuditEventType.ACCOUNT_ACTIVATED
          : updateDto.status === AccountStatus.FROZEN
            ? AccountAuditEventType.ACCOUNT_FROZEN
            : AccountAuditEventType.ACCOUNT_CLOSED;

      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        updateDto.userId || 'system',
        eventType,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Post(':id/deposit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deposit money into account' })
  @ApiResponse({ status: 200, description: 'Deposit successful', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async deposit(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @Body('userId') userId?: string,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Depositing ${amount} to account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new BadRequestException('Cannot deposit to a non-active account');
    }

    account.deposit(amount);
    const updatedAccount = await this.accountRepository.update(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        userId || 'system',
        AccountAuditEventType.DEPOSIT,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Post(':id/withdraw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Withdraw money from account' })
  @ApiResponse({ status: 200, description: 'Withdrawal successful', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiResponse({ status: 400, description: 'Insufficient funds or account not active' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async withdraw(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @Body('userId') userId?: string,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Withdrawing ${amount} from account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new BadRequestException('Cannot withdraw from a non-active account');
    }

    try {
      account.withdraw(amount);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    const updatedAccount = await this.accountRepository.update(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        userId || 'system',
        AccountAuditEventType.WITHDRAWAL,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an account' })
  @ApiResponse({ status: 204, description: 'Account deleted successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async deleteAccount(@Param('id') id: string, @Body('userId') userId?: string): Promise<void> {
    this.logger.log(`Deleting account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    await this.accountRepository.delete(id);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        id,
        account.accountNumber,
        account.customerId,
        userId || 'system',
        AccountAuditEventType.ACCOUNT_DELETED,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }
  }

  private toResponseDto(account: Account): AccountResponseDto {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      customerId: account.customerId,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}