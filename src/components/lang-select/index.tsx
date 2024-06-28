import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useLocales, useTranslate } from "../../locales";

export const LangSelect = () => {
  const { onChangeLang } = useTranslate();

  const { currentLang } = useLocales();

  const handleChange = (event: SelectChangeEvent) => {
    onChangeLang(event.target.value as string);
  };

  return (
    <Select sx={{width: "117px", height:"38px", borderRadius: "11px"}} value={currentLang.value} onChange={handleChange}>
      <MenuItem value={"en"}>English</MenuItem>
      <MenuItem value={"ar"}>Arabic</MenuItem>
    </Select>
  );
};
