import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AccountController } from '../src/infrastructure/controllers/account.controller';
import { CreateAccountUseCase } from '../src/application/use-cases/create-account.use-case';
import { Account, AccountStatus, AccountType } from '../src/domain/entities/account.entity';
import { AccountRepositoryPort } from '../src/domain/ports/account.repository.port';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let createAccountUseCase: CreateAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepositoryPort>;

  const mockCreateAccountUseCase = (): jest.Mocked<CreateAccountUseCase> => ({
    execute: jest.fn(),
  } as any);

  const mockAccountRepository = (): jest.Mocked<AccountRepositoryPort> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByAccountNumber: jest.fn(),
    findByCustomerId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    existsByAccountNumber: jest.fn(),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CreateAccountUseCase,
          useValue: mockCreateAccountUseCase(),
        },
        {
          provide: 'AccountRepositoryPort',
          useValue: mockAccountRepository(),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();

    createAccountUseCase = moduleFixture.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = moduleFixture.get<AccountRepositoryPort>('AccountRepositoryPort');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /accounts', () => {
    const createAccountDto = {
      accountNumber: 'ACC-2024-001',
      customerId: 'CUST-123',
      accountType: AccountType.SAVINGS,
      initialBalance: 1000,
      ownerName: 'Juan Pérez',
    };

    it('debe crear una cuenta exitosamente', async () => {
      const mockAccount: Account = {
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
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

      (createAccountUseCase.execute as jest.Mock).mockResolvedValue(mockAccount);

      const response = await request(app.getHttpServer())
        .post('/accounts')
        .send(createAccountDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.accountNumber).toBe(createAccountDto.accountNumber);
    });

    it('debe retornar 400 cuando el DTO es inválido', async () => {
      const invalidDto = {
        accountNumber: '',
        customerId: '',
        accountType: 'INVALID_TYPE',
        initialBalance: -100,
        ownerName: '',
      };

      const response = await request(app.getHttpServer())
        .post('/accounts')
        .send(invalidDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('debe retornar 409 cuando la cuenta ya existe (idempotencia)', async () => {
      (createAccountUseCase.execute as jest.Mock).mockRejectedValue(
        new Error('Account with this accountNumber already exists')
      );

      await request(app.getHttpServer())
        .post('/accounts')
        .send(createAccountDto)
        .expect(409);
    });
  });

  describe('GET /accounts/:id', () => {
    it('debe obtener una cuenta por ID', async () => {
      const mockAccount: Account = {
        id: 'uuid-1',
        accountNumber: 'ACC-2024-001',
        customerId: 'CUST-123',
        accountType: AccountType.SAVINGS,
        balance: 1000,
        status: AccountStatus.ACTIVE,
        ownerName: 'Juan Pérez',
        createdAt: new Date(),
        updatedAt: new Date(),
        deposit: function(amount: number): void { this.balance += amount; },
        withdraw: function(amount: number): void { this.balance -= amount; },
        freeze: function(): void { this.status = AccountStatus.FROZEN; },
        activate: function(): void { this.status = AccountStatus.ACTIVE; },
        close: function(): void { this.status = AccountStatus.CLOSED; },
      };

      accountRepository.findById.mockResolvedValue(mockAccount);

      const response = await request(app.getHttpServer())
        .get('/accounts/uuid-1')
        .expect(200);

      expect(response.body.id).toBe('uuid-1');
    });

    it('debe retornar 404 cuando la cuenta no existe', async () => {
      accountRepository.findById.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/accounts/non-existent-id')
        .expect(404);
    });
  });

  describe('GET /accounts/customer/:customerId', () => {
    it('debe obtener cuentas por customerId', async () => {
      const mockAccounts: Account[] = [
        {
          id: 'uuid-1',
          accountNumber: 'ACC-2024-001',
          customerId: 'CUST-123',
          accountType: AccountType.SAVINGS,
          balance: 1000,
          status: AccountStatus.ACTIVE,
          ownerName: 'Juan Pérez',
          createdAt: new Date(),
          updatedAt: new Date(),
          deposit: function(amount: number): void { this.balance += amount; },
          withdraw: function(amount: number): void { this.balance -= amount; },
          freeze: function(): void { this.status = AccountStatus.FROZEN; },
          activate: function(): void { this.status = AccountStatus.ACTIVE; },
          close: function(): void { this.status = AccountStatus.CLOSED; },
        },
      ];

      accountRepository.findByCustomerId.mockResolvedValue(mockAccounts);

      const response = await request(app.getHttpServer())
        .get('/accounts/customer/CUST-123')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });
});