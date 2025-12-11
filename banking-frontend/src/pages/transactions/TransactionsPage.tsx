import { useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TransactionForm from "./TransactionForm";
import type {Transaction} from "../../types/Transaction";

const TransactionsPage = () => {
    const [openForm, setOpenForm] = useState(false);
    const [history, setHistory] = useState<Transaction[]>([]);

    // Ajouter transaction dans l’historique local
    const addToHistory = (tr: Transaction) => {
        setHistory([tr, ...history]);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Transfert d’Argent</h1>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenForm(true)}
                style={{ marginBottom: "20px" }}
            >
                Effectuer un Transfert
            </Button>

            <TransactionForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={addToHistory}
            />

            <h2>Historique des Transactions</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Source</b></TableCell>
                            <TableCell><b>Destination</b></TableCell>
                            <TableCell><b>Montant</b></TableCell>
                            <TableCell><b>Date</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {history.map((tr) => (
                            <TableRow key={tr.id}>
                                <TableCell>{tr.id}</TableCell>
                                <TableCell>{tr.sourceAccountId}</TableCell>
                                <TableCell>{tr.destinationAccountId}</TableCell>
                                <TableCell>{tr.amount} MAD</TableCell>
                                <TableCell>{tr.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
};

export default TransactionsPage;
