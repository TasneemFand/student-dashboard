import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../auth/hooks";
import { useRouter } from "../../../../routes/hooks";
import { paths } from "../../../../routes/paths";
import toast, { Toaster } from "react-hot-toast";
import { Box, Divider, IconButton } from "@mui/material";

export const SideBarMobile = () => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #E8E8E8",
        width: "50px",
        height: "100vh",
      }}
    >
      <img
        src={"/assests/dashborad/logo1.svg"}
        alt="logo"
        style={{ paddingLeft: "14px", paddingTop: "20px", width: "fit-content" }}
      />
      <Divider sx={{ position: "absolute", top: "72px", width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          borderLeft: pathnames.includes("students")
            ? "4px solid #1F7BF4"
            : "none",
          alignItems: "center",
          paddingY: 1,
          gap: 1,
          marginTop: 5,
          backgroundColor: pathnames.includes("students") ? "#EEF5F9" : "unset",
        }}
      >
        <img src={"/assests/dashborad/school 1.svg"} style={{paddingLeft: "10px"}}/>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "auto",
          paddingBottom: "20px",
          justifyContent: "center"
        }}
      >
        <IconButton onClick={handleLogout}>
          <img
            src={"/assests/dashborad/logout.svg"}
            alt="logout"
          />
        </IconButton>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};
