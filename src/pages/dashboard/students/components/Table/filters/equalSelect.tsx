import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useTranslate } from "../../../../../../locales";

export const EqualSelect = () => {
  const { t } = useTranslate();

  const [value, setValue] = useState("equal");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  };

  return (
    <Select
    variant="standard"
      sx={{
        width: "140px",
        padding: 1,"&::before": {
        display: "none"
      }, "&::after": {
        display: "none"

      },"&:focus": {
        backgroundColor: "unset"
      }}}
      value={value}
      onChange={handleChange}
    >
      <MenuItem value={"equal"}>{t("equalTo")}</MenuItem>
      <MenuItem value={"greater"}>{t("bigger")}</MenuItem>
      <MenuItem value={"less"}>{t("less")}</MenuItem>
    </Select>
  );
};
