import { Switch, TextField, TextFieldProps, styled } from "@mui/material";

export const CustomizedTextField = styled(
  (props: TextFieldProps & { readOnly: boolean }) => <TextField {...props} />
)(({ readOnly }) => ({
  "& label.Mui-focused": {
    color: readOnly ? "rgba(0, 0, 0, 0.6)" : "#1976d2",
  },
  "& .MuiInputBase-input": {
    cursor: readOnly ? "initial" : "text",
    height: "15px"
  },
  "& .MuiInput-root::after": {
    display: readOnly ? "none" : "block",
  },
  "& .MuiInput-root::before": {
    borderBottom: readOnly ? "unset" : "inherit",
  },
  "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
    borderBottom: readOnly ? "unset" : "inherit",
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    left: "calc(100% - 90%)",
  },
}));

export const CustomizedSwitchField = styled(Switch)(() => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url(/assets/Main/Employees/checkIcon.svg)`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url(/assets/Main/Employees/closeIcon.svg)`,
      right: 12,
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
  "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
    backgroundColor: "#013651",
    opacity: "initial",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
