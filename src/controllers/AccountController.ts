import { Request, Response } from "express";
import { AccountService } from "../services/AccountService";
import { NotificationService } from "../services/NotificationService";
import { AccountEvent } from "../models/AccountEvent";
import logger from "../utils/logger";

export class AccountController {
  private accountService = new AccountService();
  private notificationService = new NotificationService();

  async withdraw(req: Request, res: Response): Promise<void> {
    const { accountId, amount } = req.body;

    if (!accountId || !amount || amount <= 0) {
      res.status(400).send("Invalid request parameters");
      return;
    }

    try {
      await this.accountService.withdraw(accountId, amount);

      const event = new AccountEvent(
        accountId,
        amount,
        "WITHDRAWAL",
        "SUCCESSFUL"
      );

      await this.notificationService.notify(event);

      res.status(200).send("Withdrawal successful");
    } catch (error: any) {
      const event = new AccountEvent(
        accountId,
        amount,
        "WITHDRAWAL",
        "UNSUCCESSFUL"
      );

      await this.notificationService.notify(event);

      if (error.name === "InsufficientFundsError") {
        res.status(400).send("Insufficient funds for withdrawal");
      } else {
        logger.error("Error during withdrawal:", error);
        res.status(500).send("Withdrawal failed due to an internal error");
      }
    }
  }

  async deposit(req: Request, res: Response): Promise<void> {
    const { accountId, amount } = req.body;

    if (!accountId || !amount || amount <= 0) {
      res.status(400).send("Invalid request parameters");
      return;
    }

    try {
      await this.accountService.deposit(accountId, amount);
      const event = new AccountEvent(
        accountId,
        amount,
        "DEPOSIT",
        "SUCCESSFUL"
      );
      await this.notificationService.notify(event);

      res.status(200).send("Deposit successful");
    } catch (error: any) {
      logger.error("Error during deposit:", error);
      const event = new AccountEvent(
        accountId,
        amount,
        "DEPOSIT",
        "UNSUCCESSFUL"
      );

      await this.notificationService.notify(event);

      res.status(500).send("Deposit failed due to an internal error");
    }
  }

  async getBalance(req: Request, res: Response): Promise<void> {
    const { accountId } = req.body;

    if (!accountId) {
      res.status(400).send("Invalid request parameters");
      return;
    }

    try {
      const accountBalnce = await this.accountService.getBalance(accountId);

      const event = new AccountEvent(
        accountId,
        0,
        "BALANCE_CHECK",
        "SUCCESSFUL"
      );

      await this.notificationService.notify(event);

      res.status(200).send({ balance: accountBalnce?.toFixed(2) });
    } catch (error: any) {
      logger.error("Error during deposit:", error);
      const event = new AccountEvent(
        accountId,
        0,
        "BALANCE_CHECK",
        "UNSUCCESSFUL"
      );

      await this.notificationService.notify(event);

      res.status(500).send("Deposit failed due to an internal error");
    }
  }
}
