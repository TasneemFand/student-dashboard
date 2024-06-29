import { Box, Theme, useMediaQuery } from "@mui/material";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { SideBarMobile } from "./components/sidebar/sidebarMobile";

export const DashboardLayout = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {isMobile ? <SideBarMobile /> : <Sidebar />}
      <Box
        sx={{
          height: "100vh",
          position: "absolute",
          left: isMobile ? "50px" : "250px",
          width: `calc(100% - ${isMobile ? 50 : 250}px)`,
        }}
      >
        <Navbar />
        <Box
          sx={{
            top: "72px",
            position: "absolute",
            width: "100%",
            height: `calc(100vh - ${72}px)`,
            overflowY: "auto",
            backgroundColor: "#F3F6F9",
            padding: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
