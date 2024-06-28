import _ from "lodash";
import { Control, Controller } from "react-hook-form";
import { CustomizedTextField } from "./FormFieldsStyles";
import { TextFieldProps } from "@mui/material";

type TextFieldController = TextFieldProps & {
  control: Control<Record<string, unknown>>;
  readOnly: boolean;
  fieldName: keyof Record<string, unknown>;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  required?: boolean;
  endAdornment?: JSX.Element;
  minNumber?: number;
  maxNumber?: number;
};

export const TextFieldController = ({
  control,
  fieldName,
  label,
  readOnly,
  type,
  required,
  endAdornment,
  multiline,
  maxRows,
  rows,
  minNumber,
  maxNumber,
}: TextFieldController) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({
        field: { value, onChange, ...rest },
        fieldState: { error },
      }) => {
        return (
          <CustomizedTextField
            variant={readOnly ? "standard" : "outlined"}
            value={value}
            multiline={multiline}
            maxRows={maxRows}
            rows={rows}
            fullWidth
            label={label}
            {...rest}
            type={type}
            error={Boolean(error?.message)}
            helperText={
              error?.message
            }
            onChange={
              type === "number"
                ? (event) => {
                    const inputValue = event.target.value.trim();
                    onChange(inputValue === "" ? 0 : _.toNumber(inputValue));
                  }
                : onChange
            }
            readOnly={readOnly}
            required={required}
            inputProps={{ min: minNumber, max: maxNumber }}
            InputProps={{
              readOnly,
              endAdornment,
            }}
           
          />
        );
      }}
    />
  );
};
