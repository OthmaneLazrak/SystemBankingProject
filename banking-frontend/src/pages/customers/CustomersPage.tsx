import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { customerApi } from "../../api/customerApi";
import type {Customer} from "../../types/Customer";
import CustomerForm from "./CustomerForm";

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    // Charger tous les customers
    const loadCustomers = async () => {
        const res = await customerApi.getAll();
        setCustomers(res.data);
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Supprimer un customer
    const handleDelete = async (id: number) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
            await customerApi.delete(id);
            await loadCustomers();
        }
    };

    return (
        <div style={{ padding: "20px" }}>
    <h1>Liste des Clients</h1>

    <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={() => {
        setEditingCustomer(null);
        setOpenForm(true);
    }}
    style={{ marginBottom: "20px" }}
>
    Ajouter un Client
    </Button>

    {/* TABLE */}
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>ID</b></TableCell>
    <TableCell><b>Nom</b></TableCell>
    <TableCell><b>Email</b></TableCell>
    <TableCell><b>Actions</b></TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
    {customers.map((c) => (
            <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>

                {/* MODIFIER */}
                <IconButton
        color="primary"
        onClick={() => {
        setEditingCustomer(c);
        setOpenForm(true);
    }}
>
    <EditIcon />
    </IconButton>

    {/* SUPPRIMER */}
    <IconButton
        color="error"
    onClick={() => handleDelete(c.id!)}
>
    <DeleteIcon />
    </IconButton>

    </TableCell>
    </TableRow>
))}
    </TableBody>

    </Table>
    </TableContainer>

    {/* FORMULAIRE MODAL */}
    <CustomerForm
        open={openForm}
    onClose={() => setOpenForm(false)}
    customer={editingCustomer}
    reload={loadCustomers}
    />
    </div>
);
};

export default CustomersPage;
