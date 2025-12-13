// src/pages/reporting/ReportingPage.tsx
import { useState } from "react";
import {TextField, Button, Typography, Paper, CircularProgress, Box} from "@mui/material";
import axios from "axios";
import type { CurrencyRate } from "../../types/CurrencyRate";

const ReportingPage = () => {
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [result, setResult] = useState<CurrencyRate | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRate = async () => {
        if (!fromCurrency || !toCurrency) {
            setError("Veuillez saisir les deux devises.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await axios.get<CurrencyRate>(
                `http://localhost:8080/reporting/currency?from=${fromCurrency}&to=${toCurrency}`
            );
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la récupération du taux !");
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Conversion de devises
            </Typography>

            <Paper style={{ padding: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <TextField
                        label="De"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
                        fullWidth
                    />
                    <TextField
                        label="Vers"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                        fullWidth
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchRate}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Obtenir le taux"}
                </Button>

                {error && (
                    <Typography color="error" style={{ marginTop: "10px" }}>
                        {error}
                    </Typography>
                )}
            </Paper>

            {result && (
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        maxWidth: 400,
                        margin: "20px auto",
                        borderRadius: 3,
                        background: "#f5f5f5",
                        textAlign: "center",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Taux de change
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {result.from}
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                            →
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {result.to}
                        </Typography>
                    </Box>

                    <Typography variant="h3" color="primary" sx={{ mb: 1 }}>
                        {result.rate}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        Date du taux : {result.date}
                    </Typography>
                </Paper>
            )}
        </div>
    );
};

export default ReportingPage;
