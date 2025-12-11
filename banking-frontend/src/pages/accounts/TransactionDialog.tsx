import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from "@mui/material";
import { useState } from "react";
import { accountApi } from "../../api/accountApi";

interface Props {
    accountId: number;
    type: "credit" | "debit";
    onClose: () => void;
    reload: () => void;
}

const TransactionDialog = ({ accountId, type, onClose, reload }: Props) => {
    const [amount, setAmount] = useState(0);

    const handleSubmit = async () => {
        if (type === "credit") {
            await accountApi.credit(accountId, amount);
        } else {
            await accountApi.debit(accountId, amount);
        }

        reload();
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>
                {type === "credit" ? "Créditer" : "Débiter"} un montant
            </DialogTitle>

            <DialogContent>
                <TextField
                    label="Montant"
                    type="number"
                    fullWidth
                    margin="dense"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionDialog;
