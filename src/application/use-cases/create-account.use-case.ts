import { Inject, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { AuditServicePort, AccountAuditEventType, AccountAuditEvent } from '../../domain/ports/audit.service.port';
import { appConfig, AUDIT_TIMEOUT_MS, IDEMPOTENCY_WINDOW_HOURS } from '../../infrastructure/config/app.config';

interface CreateAccountInput {
  customerId: string;
  accountType: AccountType;
  initialBalance?: number;
}

interface CreateAccountOutput {
  id: string;
  accountNumber: string;
  customerId: string;
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
}

@Injectable()
export class CreateAccountUseCase {
  private readonly logger = new Logger(CreateAccountUseCase.name);
  private readonly idempotencyCache = new Map<string, { output: CreateAccountOutput; expiresAt: Date }>();

  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
    @Inject(AuditServicePort)
    private readonly auditService: AuditServicePort,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  async execute(input: CreateAccountInput, requestId: string): Promise<CreateAccountOutput> {
    const accountNumber = this.generateAccountNumber(input.customerId);
    const idempotencyKey = `${input.customerId}-${accountNumber}`;
    
    const cached = this.checkIdempotencyCache(idempotencyKey);
    if (cached) {
      this.logger.log(`Returning cached response for idempotency key: ${idempotencyKey}`);
      return cached;
    }

    const existingAccount = await this.accountRepository.findByAccountNumber(accountNumber);
    if (existingAccount) {
      this.logger.log(`Account already exists for customer ${input.customerId}, returning existing`);
      const output = this.mapToOutput(existingAccount);
      this.storeInIdempotencyCache(idempotencyKey, output);
      return output;
    }

    const initialBalance = input.initialBalance ?? this.config.account.defaultInitialBalance;
    const account = new Account(
      uuidv4(),
      accountNumber,
      input.customerId,
      input.accountType,
      initialBalance,
      AccountStatus.ACTIVE,
      new Date(),
      new Date(),
    );

    const createdAccount = await this.accountRepository.create(account);
    await this.logAccountCreation(createdAccount, requestId);

    const output = this.mapToOutput(createdAccount);
    this.storeInIdempotencyCache(idempotencyKey, output);
    
    this.logger.log(`Account created successfully: ${createdAccount.id} for customer ${input.customerId}`);
    return output;
  }

  private generateAccountNumber(customerId: string): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ACC-${customerId}-${timestamp}-${randomSuffix}`;
  }

  private checkIdempotencyCache(key: string): CreateAccountOutput | null {
    const cached = this.idempotencyCache.get(key);
    if (!cached) return null;
    
    if (new Date() > cached.expiresAt) {
      this.idempotencyCache.delete(key);
      return null;
    }
    return cached.output;
  }

  private storeInIdempotencyCache(key: string, output: CreateAccountOutput): void {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + this.config.account.idempotencyWindowHours);
    this.idempotencyCache.set(key, { output, expiresAt });
  }

  private async logAccountCreation(account: Account, requestId: string): Promise<void> {
    const auditEvent: AccountAuditEvent = {
      entityType: 'Account',
      entityId: account.id,
      eventType: AccountAuditEventType.ACCOUNT_CREATED,
      userId: account.customerId,
      timestamp: new Date(),
      metadata: {
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        requestId,
      },
    };

    try {
      const timeoutPromise = new Promise<void>((_, reject) => 
        setTimeout(() => reject(new Error('Audit timeout')), AUDIT_TIMEOUT_MS)
      );
      await Promise.race([this.auditService.logEvent(auditEvent), timeoutPromise]);
    } catch (error) {
      this.logger.warn(`Failed to log audit event within ${AUDIT_TIMEOUT_MS}ms: ${error.message}`);
    }
  }

  private mapToOutput(account: Account): CreateAccountOutput {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      customerId: account.customerId,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
      createdAt: account.createdAt,
    };
  }
}