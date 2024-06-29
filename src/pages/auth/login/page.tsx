import { Box, Theme, useMediaQuery } from "@mui/material";
import { LangSelect } from "../../../components/lang-select";
import { LoginForm } from "./components/login-form";

export const Login = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box sx={{ display: "flex", height: "100%", gap: 3 }}>
      {isMobile ? null : (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 5,
            paddingX: 6,
            gap: "100px",
          }}
        >
          <LangSelect />
          <img
            loading="lazy"
            src={"/dashboard/students/assests/login/login1.svg"}
            alt="login"
            width={"100%"}
          />
        </Box>
      )}

      <Box
        sx={{
          flex: 2,
          backgroundImage: "url(/assests/login/login.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "center",
          display: "flex",
          justifyContent: isMobile ? "space-evenly" : "center",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {isMobile ? <LangSelect /> : null}
        <Box
          sx={{
            backgroundColor: "white",
            paddingY: 5,
            paddingX: 5,
            borderRadius: "6px",
            maxWidth: "500px",
          }}
        >
          <img
            src={"/dashboard/students/assests/login/loginText.svg"}
            alt="login"
            style={{ marginBottom: "24px", width: "80px" }}
          />
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};
