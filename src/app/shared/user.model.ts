export class Transaction {
  constructor(
    public amount: string,
    public blockChainCurrency: string,
    public timestamp: string,
    public transactionHash: string,
    public confirmations: string,
  ) { }
}
