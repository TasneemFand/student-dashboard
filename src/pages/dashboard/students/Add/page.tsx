import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../../locales";
import CloseIcon from "@mui/icons-material/Close";
import { NewStudentForm } from "./components/NewForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { EditStudentForm } from "./components/EditStudentForm";

type TProps = {
  type: "add" | "edit";
};

export const AddDialog = ({ type }: TProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard/students");
  };

  const { t } = useTranslate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ paddingBottom: 0, fontSize: "1.2rem" }}
      >
        {type === "add" ? `${t("addStudent")}` : `${t("editStudent")}`}
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={
          {
            //   maxWidth: 400,
          }
        }
      >
        <>
          {type === "add" ? (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <NewStudentForm handleClose={handleClose} />
            </LocalizationProvider>
          ) : (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <EditStudentForm handleClose={handleClose} />
            </LocalizationProvider>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};
