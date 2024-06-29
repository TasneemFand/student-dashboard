import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateIcon } from "../../../../../../components/svg-icons/icons";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type TProps = {
  onChangeDate: (value: dayjs.Dayjs | null) => void;
};
export const PickerDate = ({ onChangeDate }: TProps) => {
  const [value, setValue] = useState<Dayjs | null>();

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    setValue(newValue);
    onChangeDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={handleChange}
        slots={{ openPickerIcon: DateIcon }}
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
          actionBar: {
            actions: ["clear"],
          },
        }}
       
      />
    </LocalizationProvider>
  );
};
