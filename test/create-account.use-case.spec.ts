import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from '../src/application/use-cases/create-account.use-case';
import { AccountRepositoryPort } from '../src/domain/ports/account.repository.port';
import { AuditServicePort } from '../src/domain/ports/audit.service.port';
import { Account, AccountStatus, AccountType } from '../src/domain/entities/account.entity';
import { AccountAuditEventType } from '../src/domain/ports/audit.service.port';

describe('CreateAccountUseCase', () => {
  let useCase: CreateAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepositoryPort>;
  let auditService: jest.Mocked<AuditServicePort>;

  const mockAccountRepository = (): jest.Mocked<AccountRepositoryPort> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByAccountNumber: jest.fn(),
    findByCustomerId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    existsByAccountNumber: jest.fn(),
  });

  const mockAuditService = (): jest.Mocked<AuditServicePort> => ({
    logEvent: jest.fn(),
    getEventsByEntity: jest.fn(),
    getEventsByUser: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: 'AccountRepositoryPort',
          useValue: mockAccountRepository(),
        },
        {
          provide: 'AuditServicePort',
          useValue: mockAuditService(),
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = module.get('AccountRepositoryPort');
    auditService = module.get('AuditServicePort');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const createAccountDto = {
      accountNumber: 'ACC-2024-001',
      customerId: 'CUST-123',
      accountType: AccountType.SAVINGS,
      initialBalance: 1000,
      ownerName: 'Juan Pérez',
    };

    it('debe crear una cuenta exitosamente cuando no existe', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockResolvedValue();

      const result = await useCase.execute(createAccountDto);

      expect(accountRepository.existsByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.create).toHaveBeenCalled();
      expect(auditService.logEvent).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.accountNumber).toBe(createAccountDto.accountNumber);
    });

    it('debe retornar cuenta existente cuando el número de cuenta ya existe (idempotencia)', async () => {
      const existingAccount: Account = {
        id: 'uuid-existing',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: 1000,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
        deposit: function(amount: number): void { this.balance += amount; },
        withdraw: function(amount: number): void { this.balance -= amount; },
        freeze: function(): void { this.status = AccountStatus.FROZEN; },
        activate: function(): void { this.status = AccountStatus.ACTIVE; },
        close: function(): void { this.status = AccountStatus.CLOSED; },
      };

      accountRepository.existsByAccountNumber.mockResolvedValue(true);
      accountRepository.findByAccountNumber.mockResolvedValue(existingAccount);

      const result = await useCase.execute(createAccountDto);

      expect(accountRepository.existsByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.create).not.toHaveBeenCalled();
      expect(result.id).toBe(existingAccount.id);
    });

    it('debe fallar cuando el balance inicial es negativo', async () => {
      const invalidDto = { ...createAccountDto, initialBalance: -100 };

      await expect(useCase.execute(invalidDto)).rejects.toThrow();
      expect(accountRepository.create).not.toHaveBeenCalled();
    });

    it('debe registrar evento de auditoría al crear cuenta', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockResolvedValue();

      await useCase.execute(createAccountDto);

      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: AccountAuditEventType.ACCOUNT_CREATED,
          entityType: 'Account',
        })
      );
    });

    it('debe manejar timeout del sistema de auditoría gracefully', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockRejectedValue(new Error('Audit service timeout'));

      const result = await useCase.execute(createAccountDto);

      expect(result).toBeDefined();
    });
  });
});