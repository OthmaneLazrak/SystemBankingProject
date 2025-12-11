import type {Customer} from "./Customer";

export interface Account {
    id?: number;
    owner: string;
    customerId: number;
    balance: number;
    customer?: Customer;
}
