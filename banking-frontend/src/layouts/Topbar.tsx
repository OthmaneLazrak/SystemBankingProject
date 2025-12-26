import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Topbar = () => {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: "#ffffff",
                color: "#333",
                padding: 1,
                borderBottom: "1px solid #ddd"
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
                    
                </Typography>

                <IconButton>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
