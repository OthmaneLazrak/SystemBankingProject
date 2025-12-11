import { useEffect, useState } from "react";
import {
    Table, TableHead, TableRow, TableCell,
    TableBody, TableContainer, Paper, Button
} from "@mui/material";
import { accountApi } from "../../api/accountApi";
import type {Account} from "../../types/Account";
import AccountDetails from "./AccountDetails";

const AccountsPage = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const loadAccounts = async () => {
        const res = await accountApi.getAll();
        setAccounts(res.data);
    };

    useEffect(() => {
        loadAccounts();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Liste des Comptes</h1>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Owner</b></TableCell>
                            <TableCell><b>Customer ID</b></TableCell>
                            <TableCell><b>Balance</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {accounts.map((acc) => (
                            <TableRow key={acc.id}>
                                <TableCell>{acc.id}</TableCell>
                                <TableCell>{acc.owner}</TableCell>
                                <TableCell>{acc.customerId}</TableCell>
                                <TableCell>{acc.balance} MAD</TableCell>

                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => setSelectedAccount(acc)}
                                    >
                                        Détails
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedAccount && (
                <AccountDetails
                    account={selectedAccount}
                    onClose={() => setSelectedAccount(null)}
                />
            )}
        </div>
    );
};

export default AccountsPage;
