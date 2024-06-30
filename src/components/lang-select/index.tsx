import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useLocales, useTranslate } from "../../locales";

export const LangSelect = () => {
  const { onChangeLang } = useTranslate();

  const { currentLang } = useLocales();
  const { t } = useTranslate();

  const handleChange = (event: SelectChangeEvent) => {
    onChangeLang(event.target.value as string);
  };

  return (
    <Select sx={{width: "117px", height:"38px", borderRadius: "11px", backgroundColor: "white"}} value={currentLang.value} onChange={handleChange}>
      <MenuItem value={"en"}>{t('english')}</MenuItem>
      <MenuItem value={"ar"}>{t('arabic')}</MenuItem>
    </Select>
  );
};
