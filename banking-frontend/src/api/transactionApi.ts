import axiosClient from "./axiosClient";
import type {TransferRequest} from "../types/Transaction";

const BASE_URL = "http://localhost:8888/transaction-service/transactions";

export const transactionApi = {
    transfer: (data: TransferRequest) =>
        axiosClient.post(`${BASE_URL}/transfer`, data),
};
