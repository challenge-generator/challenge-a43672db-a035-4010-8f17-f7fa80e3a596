import { Account } from '../entities/account.entity';

export interface AccountRepositoryPort {
    create(account: Account): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByAccountNumber(accountNumber: string): Promise<Account | null>;
    findByCustomerId(customerId: string): Promise<Account[]>;
    update(account: Account): Promise<Account>;
    delete(id: string): Promise<void>;
    existsByAccountNumber(accountNumber: string): Promise<boolean>;
}