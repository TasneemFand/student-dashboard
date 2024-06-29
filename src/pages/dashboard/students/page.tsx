import { Box, Button, Typography } from "@mui/material";
import { useTranslate } from "../../../locales";
import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Table = lazy(() => import("./components/Table/index"));

export const StudentsPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "1.5px 2.6px 10px 0px rgba(119, 119, 119, 0.1)",
        borderRadius: "11px",
        paddingX: 4,
        paddingY: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "2.1875rem",
          }}
        >
          {t("studentsData")}
        </Typography>
        <Button
          endIcon={
            <img src={"/dashboard/students/assests/dashborad/add.svg"} />
          }
          onClick={() => navigate("add")}
          sx={{
            color: "white",
            backgroundColor: "rgba(31, 123, 244, 1)",
            borderRadius: " 11px",
            height: "48px",
            padding: 2,
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "rgba(31, 123, 244, 1)",
            },
          }}
        >
          {t("add")}
        </Button>
      </Box>
      <Suspense fallback={null}>
        <Table />
      </Suspense>
      <Outlet />
    </Box>
  );
};
