import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { LangSelect } from "../../../../components/lang-select";

export const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: "250px",
        backgroundColor: "white",
        width: `calc(100% - ${250}px)`,
      }}
    >
      <Toolbar sx={{ height: "72px", display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
          <Typography
            sx={{
              color: "black",
              fontSize: "0.8125rem"
            }}
          >
            William Jacobson
          </Typography>
          <img src={"/assests/dashborad/profile.svg"} alt="profile"/>
        </Box>
        <LangSelect/>
      </Toolbar>
    </AppBar>
  );
};
