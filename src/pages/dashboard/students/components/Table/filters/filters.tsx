import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../../../../../locales";
import SearchIcon from "@mui/icons-material/Search";
import { EqualSelect } from "./equalSelect";
import { PickerDate } from "./PickerDate";

export const Filters = () => {
  const { t } = useTranslate();

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <img alt="filter by" src={"/dashboard/students/assests/dashborad/Filter.svg"} />
        <Typography
          sx={{
            color: "rgba(31, 123, 244, 1)",
          }}
        >
          {t("filterBy")}:
        </Typography>
      </Box>
      <FormControl variant="outlined">
        <OutlinedInput
          sx={{
            backgroundColor: "rgba(245, 245, 245, 1)",
            borderRadius: "10px",
            width: "350px",
            maxWidth: "350px",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          placeholder={t("search")}
        />
      </FormControl>
      <Box
        sx={{
          backgroundColor: "rgba(245, 245, 245, 1)",
          borderRadius: "10px",
          display: "flex",
          height: "56px",
          border: "1px solid rgb(188 188 188)",
        }}
      >
        <EqualSelect />
        <Divider orientation="vertical" />
        <PickerDate />
      </Box>
    </Box>
  );
};
