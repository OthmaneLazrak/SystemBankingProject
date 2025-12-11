import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack
} from "@mui/material";
import { useState } from "react";
import { transactionApi } from "../../api/transactionApi";
import type {TransferRequest, Transaction} from "../../types/Transaction";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: (tr: Transaction) => void;
}

const TransactionForm = ({ open, onClose, onSuccess }: Props) => {
    const [form, setForm] = useState<TransferRequest>({
        sourceAccountId: 0,
        destinationAccountId: 0,
        amount: 0,
    });

    const handleSubmit = async () => {
        const res = await transactionApi.transfer(form);
        onSuccess(res.data); // ajouter à l’historique
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Faire un Transfert</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ marginTop: 1 }}>
                    <TextField
                        label="Compte Source"
                        type="number"
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, sourceAccountId: Number(e.target.value) })
                        }
                    />

                    <TextField
                        label="Compte Destination"
                        type="number"
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, destinationAccountId: Number(e.target.value) })
                        }
                    />

                    <TextField
                        label="Montant"
                        type="number"
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, amount: Number(e.target.value) })
                        }
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>

                <Button variant="contained" onClick={handleSubmit}>
                    Confirmer Transfert
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionForm;
