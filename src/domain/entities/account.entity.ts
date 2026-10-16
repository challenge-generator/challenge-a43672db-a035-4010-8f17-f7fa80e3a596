import { v4 as uuidv4 } from 'uuid';
import { IsString, IsNumber, IsDate, IsUUID, IsEnum, Min, ValidateIf } from 'class-validator';

export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    FROZEN = 'FROZEN',
    CLOSED = 'CLOSED'
}

export enum AccountType {
    SAVINGS = 'SAVINGS',
    CHECKING = 'CHECKING',
    LOAN = 'LOAN',
    INVESTMENT = 'INVESTMENT'
}

export class Account {
    @IsUUID()
    id: string;

    @IsString()
    accountNumber: string;

    @IsString()
    customerId: string;

    @IsEnum(AccountType)
    type: AccountType;

    @IsNumber()
    @Min(0)
    balance: number;

    @IsEnum(AccountStatus)
    status: AccountStatus;

    @IsDate()
    createdAt: Date;

    @IsDate()
    @ValidateIf(o => o.updatedAt !== undefined)
    updatedAt?: Date;

    @IsString()
    currency: string;

    constructor(
        accountNumber: string,
        customerId: string,
        type: AccountType,
        initialBalance: number,
        status: AccountStatus = AccountStatus.ACTIVE,
        currency: string = 'USD'
    ) {
        this.id = uuidv4();
        this.accountNumber = accountNumber;
        this.customerId = customerId;
        this.type = type;
        this.balance = initialBalance;
        this.status = status;
        this.createdAt = new Date();
        this.currency = currency;
    }

    public deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        if (this.status !== AccountStatus.ACTIVE) {
            throw new Error('Account is not active');
        }
        this.balance += amount;
        this.updatedAt = new Date();
    }

    public withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (this.status !== AccountStatus.ACTIVE) {
            throw new Error('Account is not active');
        }
        if (this.balance < amount) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        this.updatedAt = new Date();
    }

    public freeze(): void {
        if (this.status === AccountStatus.CLOSED) {
            throw new Error('Cannot freeze a closed account');
        }
        this.status = AccountStatus.FROZEN;
        this.updatedAt = new Date();
    }

    public activate(): void {
        if (this.status === AccountStatus.CLOSED) {
            throw new Error('Cannot activate a closed account');
        }
        this.status = AccountStatus.ACTIVE;
        this.updatedAt = new Date();
    }

    public close(): void {
        if (this.balance !== 0) {
            throw new Error('Cannot close an account with non-zero balance');
        }
        this.status = AccountStatus.CLOSED;
        this.updatedAt = new Date();
    }
}