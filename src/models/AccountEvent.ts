export class AccountEvent {
  private amount: number;
  private accountId: number;
  private status: string;
  private type: string;

  constructor(amount: number, accountId: number, type: string, status: string) {
    this.amount = amount;
    this.accountId = accountId;
    this.status = status;
    this.type = type;
  }

  // Getter for amount
  public getAmount(): number {
    return this.amount;
  }

  // Getter for accountId
  public getAccountId(): number {
    return this.accountId;
  }

  // Getter for status
  public getStatus(): string {
    return this.status;
  }

  // Getter for type
  public getTransactionType(): string {
    return this.type;
  }

  // Convert to JSON string
  public toJson(): string {
    return JSON.stringify({
      amount: this.amount,
      accountId: this.accountId,
      status: this.status,
      type: this.type,
    });
  }
}
