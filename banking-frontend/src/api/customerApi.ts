import axiosClient from "./axiosClient";
import type {Customer} from "../types/Customer";

const BASE_URL = "http://localhost:8888/customer-service/customers";

export const customerApi = {
    getAll: () => axiosClient.get<Customer[]>(`${BASE_URL}/all`),

    getById: (id: number) => axiosClient.get<Customer>(`${BASE_URL}/${id}`),

    add: (customer: Customer) => axiosClient.post(`${BASE_URL}/add`, customer),

    update: (id: number, customer: Customer) =>
        axiosClient.put(`${BASE_URL}/${id}/update`, customer),

    delete: (id: number) => axiosClient.delete(`${BASE_URL}/${id}`)
};
