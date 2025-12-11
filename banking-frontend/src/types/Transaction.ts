export interface TransferRequest {
    sourceAccountId: number;
    destinationAccountId: number;
    amount: number;
}

export interface Transaction {
    id?: number;
    sourceAccountId: number;
    destinationAccountId: number;
    amount: number;
    date?: string;
}
