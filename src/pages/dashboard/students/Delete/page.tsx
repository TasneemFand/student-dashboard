import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../../locales";
import ErrorIcon from "@mui/icons-material/Error";
import { useDelete } from "./hooks/useDelete";
import toast, { Toaster } from "react-hot-toast";
import { useGetStudents } from "../components/Table/hooks/useGetStudents";

export const DeleteDialog = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard/students");
  };

  const { t } = useTranslate();

  const { handleDeleteStudent } = useDelete();

  const { refetch } = useGetStudents();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "11px",
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: 0, fontSize: "1.2rem", padding: 0 }}>
        <Box
          sx={{
            height: "147px",
            borderEndEndRadius: "11px",
            borderEndStartRadius: "11px",
            width: "100%",
            backgroundColor: "rgba(243, 66, 53, 1)",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <ErrorIcon sx={{ color: "white", fontSize: "4rem" }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "rgba(243, 66, 53, 1)",
              fontWeight: 700,
              fontSize: "1.25rem",
              marginBottom: "16px",
            }}
          >
            {t("sure")}
          </Typography>
          <Typography sx={{}}>{t("paragraphDelete")}</Typography>
          <Typography sx={{ color: "rgba(243, 66, 53, 1)" }}>
            {t("action")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button
          onClick={async () => {
            try {
              await handleDeleteStudent();
              toast.success("Successfully Deleted");
              refetch();
              handleClose();
            } catch (error) {
              toast.error("Error happend");
            }
          }}
          sx={{
            color: "white",
            width: "50%",
            backgroundColor: "rgba(243, 66, 53, 1)",
            "&:hover": {
              backgroundColor: "rgba(243, 66, 53, 1)",
            },
          }}
        >
          {t("delete")}
        </Button>
        <Button
          sx={{
            width: "50%",
            backgroundColor: "white",
            color: "rgba(243, 66, 53, 1)",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={handleClose}
        >
          {t("cancel")}
        </Button>
      </DialogActions>
      <Toaster position="top-center" reverseOrder={false} />
    </Dialog>
  );
};
