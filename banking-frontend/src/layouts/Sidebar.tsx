import {
    Box, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import BarChartIcon from  "@mui/icons-material/BarChart";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const menu = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Customers", icon: <PeopleIcon />, path: "/customers" },
        { text: "Accounts", icon: <AccountBalanceIcon />, path: "/accounts" },
        { text: "Transactions", icon: <SwapHorizIcon />, path: "/transactions" },
        { text: "Exchange", icon: <BarChartIcon  />, path: "/exchange"},
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
        >
            <Box sx={{ padding: 2, fontWeight: "bold", fontSize: 20 }}>
                Banking App
            </Box>

            <List>
                {menu.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Drawer>
    );
};

export default Sidebar;
