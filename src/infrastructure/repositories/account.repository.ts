import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountRepository implements AccountRepositoryPort, OnModuleInit {
  private readonly logger = new Logger(AccountRepository.name);
  private accounts: Map<string, Account> = new Map();
  private accountNumberIndex: Map<string, string> = new Map();
  private customerIdIndex: Map<string, Set<string>> = new Map();

  onModuleInit() {
    this.logger.log('AccountRepository initialized with in-memory storage');
  }

  async create(account: Account): Promise<Account> {
    const existingAccount = this.accounts.get(account.id);
    if (existingAccount) {
      this.logger.warn(`Account with id ${account.id} already exists`);
      return existingAccount;
    }

    this.accounts.set(account.id, account);
    this.accountNumberIndex.set(account.accountNumber, account.id);

    const customerAccounts = this.customerIdIndex.get(account.customerId) || new Set();
    customerAccounts.add(account.id);
    this.customerIdIndex.set(account.customerId, customerAccounts);

    this.logger.log(`Account created: ${account.id} with number ${account.accountNumber}`);
    return account;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.get(id);
    if (!account) {
      this.logger.debug(`Account not found by id: ${id}`);
      return null;
    }
    return this.cloneAccount(account);
  }

  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    const accountId = this.accountNumberIndex.get(accountNumber);
    if (!accountId) {
      this.logger.debug(`Account not found by account number: ${accountNumber}`);
      return null;
    }
    const account = this.accounts.get(accountId);
    return account ? this.cloneAccount(account) : null;
  }

  async findByCustomerId(customerId: string): Promise<Account[]> {
    const accountIds = this.customerIdIndex.get(customerId);
    if (!accountIds) {
      this.logger.debug(`No accounts found for customer: ${customerId}`);
      return [];
    }
    const accounts: Account[] = [];
    for (const id of accountIds) {
      const account = this.accounts.get(id);
      if (account) {
        accounts.push(this.cloneAccount(account));
      }
    }
    this.logger.debug(`Found ${accounts.length} accounts for customer ${customerId}`);
    return accounts;
  }

  async update(account: Account): Promise<Account> {
    const existingAccount = this.accounts.get(account.id);
    if (!existingAccount) {
      this.logger.error(`Cannot update non-existent account: ${account.id}`);
      throw new Error(`Account with id ${account.id} not found`);
    }

    if (existingAccount.accountNumber !== account.accountNumber) {
      this.accountNumberIndex.delete(existingAccount.accountNumber);
      this.accountNumberIndex.set(account.accountNumber, account.id);
    }

    this.accounts.set(account.id, account);
    this.logger.log(`Account updated: ${account.id}`);
    return this.cloneAccount(account);
  }

  async delete(id: string): Promise<void> {
    const account = this.accounts.get(id);
    if (!account) {
      this.logger.warn(`Cannot delete non-existent account: ${id}`);
      return;
    }

    this.accountNumberIndex.delete(account.accountNumber);
    const customerAccounts = this.customerIdIndex.get(account.customerId);
    if (customerAccounts) {
      customerAccounts.delete(id);
      if (customerAccounts.size === 0) {
        this.customerIdIndex.delete(account.customerId);
      }
    }

    this.accounts.delete(id);
    this.logger.log(`Account deleted: ${id}`);
  }

  async existsByAccountNumber(accountNumber: string): Promise<boolean> {
    return this.accountNumberIndex.has(accountNumber);
  }

  private cloneAccount(account: Account): Account {
    return new Account(
      account.id,
      account.accountNumber,
      account.customerId,
      account.accountType,
      account.balance,
      account.status,
      account.createdAt,
      account.updatedAt,
    );
  }
}