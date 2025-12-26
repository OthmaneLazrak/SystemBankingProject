import axiosClient from "./axiosClient";
import type {Account} from "../types/Account";

const BASE_URL = "http://localhost:8888/account-service";

export const accountApi = {
    getAll: () => axiosClient.get<Account[]>(`${BASE_URL}/accounts/all`),

    getById: (id: number) => axiosClient.get<Account>(`${BASE_URL}/accounts/${id}`),

    create: (data: Account) => axiosClient.post(`${BASE_URL}/accounts/add`, data),

    debit: (id: number, amount: number) =>
        axiosClient.put(`${BASE_URL}/accounts/${id}/debit?amount=${amount}`),

    credit: (id: number, amount: number) =>
        axiosClient.put(`${BASE_URL}/accounts/${id}/credit?amount=${amount}`)
};