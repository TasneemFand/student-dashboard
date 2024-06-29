import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Control, Controller } from "react-hook-form";
import { DateIcon } from "../svg-icons/icons";
import moment from "moment";
import { isString } from "lodash";

type DatePickerComponentProps = {
  fieldName: keyof Record<string, unknown>;
  label?: string;
  control: Control<Record<string, unknown>>;
  readOnly: boolean;
  required?: boolean;
};

export const DatePickerController: React.FC<DatePickerComponentProps> = ({
  fieldName,
  label,
  control,
  readOnly,
  required,
}) => (
  <Controller
    control={control}
    name={fieldName}
    render={({
      field: { onChange, ref, value, ...rest },
      fieldState: { error },
    }) => (
        <DatePicker
          {...rest}
          onChange={(date) => onChange(date?.toISOString())}
          onAccept={(date) => {
            onChange(date?.toISOString());
            rest.onBlur();
          }}
          value={value instanceof Date ? moment(value) : isString(value) ? moment(new Date(value)) : undefined}
          inputRef={ref}
          label={label}
          readOnly={readOnly}
          format="YYYY-MM-DD"
          slots={{openPickerIcon: DateIcon}}
          slotProps={{
            textField: {
              required,
              error: Boolean(error),
              helperText: error?.message,
              variant: readOnly ? "standard" : "outlined",
              sx: {
                width: "100%",
                "& .MuiInputBase-input": {
                  cursor: readOnly ? "initial" : "text",
                },
                "& label.Mui-focused": {
                  color: readOnly ? "rgba(0, 0, 0, 0.6)" : "#1976d2",
                },
                "& .MuiInput-root::after": {
                  display: readOnly ? "none" : "block",
                },
                "& .MuiInput-root::before": {
                  borderBottom: readOnly ? "unset" : "inherit",
                },
                "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                  {
                    borderBottom: readOnly ? "unset" : "inherit",
                  },
                "& .MuiInputAdornment-root": {
                  display: readOnly ? "none" : "flex",
                },
              },
            },
            actionBar: {
              actions: ["clear"],
            },
          }}
        />
    )}
  />
);
