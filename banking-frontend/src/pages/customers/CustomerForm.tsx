import {
    Dialog, DialogTitle, DialogContent,
    TextField, DialogActions, Button
} from "@mui/material";
import {useEffect, useState} from "react";
import { customerApi } from "../../api/customerApi";
import type {Customer} from "../../types/Customer";

interface Props {
    open: boolean;
    onClose: () => void;
    customer: Customer | null;
    reload: () => void;
}

const CustomerForm = ({ open, onClose, customer, reload }: Props) => {

    const [form, setForm] = useState<Customer>({
        name: "",
        email: ""
    });

    // Reset automatique du formulaire quand le modal s'ouvre
    useEffect(() => {
        setForm({
            name: customer?.name || "",
            email: customer?.email || ""
        });
    }, [customer, open]);

    const handleSave = async () => {
        if (customer) {
            await customerApi.update(customer.id!, form);
        } else {
            await customerApi.add(form);
        }

        reload();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {customer ? "Modifier Client" : "Ajouter Client"}
            </DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    label="Nom"
                    margin="dense"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <TextField
                    fullWidth
                    label="Email"
                    margin="dense"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button variant="contained" onClick={handleSave}>
                    {customer ? "Mettre à jour" : "Créer"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerForm;
