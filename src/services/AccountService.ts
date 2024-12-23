import { Repository } from "typeorm";
import { Account } from "../entities/Account";
import config from '../config/ormconfig'
import logger from "../utils/logger";

export class AccountService {
  private accountRepository: Repository<Account>;

  constructor() {
    this.accountRepository = config.getRepository(Account);
  }

  async findAccountById(accountId: number): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { id: accountId },
    });
  }

  async withdraw(accountId: number, amount: number): Promise<void> {
    const account = await this.findAccountById(accountId);

    if (!account) {
      logger.error(`Account not found`)
      throw new Error("Account not found");
    }

    if (account.balance < amount) {
      logger.error(`InsufficientFundsError`)
      throw new Error("InsufficientFundsError");
    }

    account.balance -= amount;

    await this.accountRepository.save(account);
  }

  async deposit(accountId: number, amount: number): Promise<void> {
    const account = await this.findAccountById(accountId);

    if (!account) {
      logger.error(`Account not found`)
      throw new Error("Account not found");
    }

    account.balance += amount;

    await this.accountRepository.save(account);
  }

  async getBalance(accountId: number): Promise<number | undefined> {
    const account = await this.findAccountById(accountId);

    if (!account) {
      logger.error(`Account not found`)
      throw new Error("Account not found");
    }

    logger.info(`Balance for account ${accountId}: ${account.balance}`);

    return account.balance;
  }
}
