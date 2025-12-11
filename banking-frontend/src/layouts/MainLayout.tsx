import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <Sidebar />

            {/* Contenu principal */}
            <Box sx={{ flexGrow: 1, backgroundColor: "#f5f6fa" }}>

                {/* Topbar */}
                <Topbar />

                {/* Contenu des pages */}
                <Box sx={{ padding: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
