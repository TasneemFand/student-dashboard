import { Box, Button, Divider } from "@mui/material";
import { useAuthContext } from "../../../../auth/hooks";
import { useRouter } from "../../../../routes/hooks";
import toast, { Toaster } from "react-hot-toast";
import { paths } from "../../../../routes/paths";
import { useTranslate } from "../../../../locales";
import { NavLink, useLocation } from "react-router-dom";
import './index.css';

export const Sidebar = () => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);


  const handleLogout = async () => {
    try {
      await logout();
      router.replace(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    }
  };

  const { t } = useTranslate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #E8E8E8",
        width: "250px",
        height: "100vh",
      }}
    >
      <img
        width={"60%"}
        src={"/assests/dashborad/logo.svg"}
        alt="logo"
        style={{ paddingLeft: "24px", paddingTop: "20px" }}
      />
      <Divider sx={{ position: "absolute", top: "72px", width: "100%" }} />
      <Box sx={{ display: "flex", borderLeft:  pathnames.includes("students") ? "4px solid #1F7BF4" : "none", alignItems: "center", paddingY: 1, gap: 1, paddingLeft: "24px", marginTop: 5, backgroundColor: pathnames.includes("students") ? "#EEF5F9": "unset" }}>
        <img src={"/assests/dashborad/school 1.svg"} />
        <NavLink
          to={"/dashboard/students"}
          className="menu"
        >
          {t('studentsData')}
        </NavLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "24px",
          marginTop: "auto",
          paddingBottom: "20px",
        }}
      >
        <img src={"/assests/dashborad/logout.svg"} alt="logout" />
        <Button
          onClick={handleLogout}
          sx={{
            color: "black",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "unset",
            },
          }}
        >
          {t("logout")}
        </Button>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};
