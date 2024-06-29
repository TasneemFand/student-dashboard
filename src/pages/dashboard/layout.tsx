import { Box } from "@mui/material";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <Sidebar />
      <Box sx={{
        height: "100vh",
        position: "absolute",
        left: "250px",
        width: `calc(100% - ${250}px)`
      }}>
        <Navbar />
        <Box sx={{
            top: "72px",
            position: "absolute",
            width: "100%",
            height: `calc(100vh - ${72}px)`,
            backgroundColor: "#F3F6F9",
            padding: 3
        }}>
            <Outlet/>
        </Box>
      </Box>
    </Box>
  );
};
