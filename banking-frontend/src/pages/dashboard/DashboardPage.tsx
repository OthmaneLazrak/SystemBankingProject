import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import StatsCard from "./StatsCard";
import { customerApi } from "../../api/customerApi";
import { accountApi } from "../../api/accountApi";

import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const DashboardPage = () => {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const c = await customerApi.getAll();
            setTotalCustomers(c.data.length);

            const a = await accountApi.getAll();
            setTotalAccounts(a.data.length);

            const balance = a.data.reduce(
                (sum: number, acc: any) => sum + acc.balance,
                0
            );
            setTotalBalance(balance);

            const fakeActivity = [
                { month: "Jan", value: 3000 },
                { month: "Feb", value: 4500 },
                { month: "Mar", value: 3900 },
                { month: "Apr", value: 5200 },
                { month: "May", value: 4800 },
                { month: "Jun", value: 6100 },
            ];

            setRecentActivity(fakeActivity);
        };

        loadData();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" fontWeight="bold" marginBottom={3}>
                Dashboard Bancaire
            </Typography>

            {/* KPIs — sans Grid */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <StatsCard title="Clients" value={totalCustomers} />
                <StatsCard title="Comptes" value={totalAccounts} />
                <StatsCard title="Solde Total" value={totalBalance + " MAD"} />
                <StatsCard title="Transactions" value={"N/A"} />
            </div>

            {/* Graphique */}
            <Paper sx={{ marginTop: 5, padding: 3, height: 350 }}>
                <Typography variant="h6" marginBottom={2}>
                    Activité des derniers mois
                </Typography>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recentActivity}>
                        <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>
        </div>
    );
};

export default DashboardPage;
