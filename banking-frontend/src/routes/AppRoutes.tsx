import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CustomersPage from "../pages/customers/CustomersPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AccountsPage from "../pages/accounts/AccountPage";
import TransactionsPage from "../pages/transactions/TransactionsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
        </Routes>
    );
}
