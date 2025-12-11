import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { accountApi } from "../../api/accountApi";
import type {Account} from "../../types/Account";
import TransactionDialog from "./TransactionDialog";

interface Props {
    account: Account;
    onClose: () => void;
}

const AccountDetails = ({ account, onClose }: Props) => {
    const [fullAccount, setFullAccount] = useState<Account | null>(null);
    const [openTransaction, setOpenTransaction] = useState<{
        type: "credit" | "debit" | null;
    }>({ type: null });

    useEffect(() => {
        const load = async () => {
            const res = await accountApi.getById(account.id!);
            setFullAccount(res.data);
        };

        load();
    }, [account]);

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Détails du Compte</DialogTitle>

            <DialogContent>
                {fullAccount && (
                    <Stack spacing={2}>
                        <Typography><b>ID :</b> {fullAccount.id}</Typography>
                        <Typography><b>Owner :</b> {fullAccount.owner}</Typography>
                        <Typography><b>Balance :</b> {fullAccount.balance} MAD</Typography>

                        {/* CUSTOMER SECTION */}
                        {fullAccount.customer && (
                            <>
                                <Typography variant="h6">Client associé</Typography>
                                <Typography><b>Nom :</b> {fullAccount.customer.name}</Typography>
                                <Typography><b>Email :</b> {fullAccount.customer.email}</Typography>
                            </>
                        )}
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenTransaction({ type: "debit" })}
                >
                    Débiter
                </Button>

                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => setOpenTransaction({ type: "credit" })}
                >
                    Créditer
                </Button>

                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>

            {/* Modal pour crédit/debit */}
            {openTransaction.type && (
                <TransactionDialog
                    accountId={account.id!}
                    type={openTransaction.type}
                    onClose={() => setOpenTransaction({ type: null })}
                    reload={() => {}}
                />
            )}
        </Dialog>
    );
};

export default AccountDetails;
