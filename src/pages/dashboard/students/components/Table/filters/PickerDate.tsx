import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateIcon } from "../../../../../../components/svg-icons/icons";

export const PickerDate = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      slots={{openPickerIcon: DateIcon}}
        slotProps={{
          textField: {
            variant: "standard",
            sx: {
              height: "56px",
              padding: 1.5,
              "& .MuiInput-root::before": {
                display: "none",
              },
              "& .MuiInput-root::after": {
                display: "none",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
