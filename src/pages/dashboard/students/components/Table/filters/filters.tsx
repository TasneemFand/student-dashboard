import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslate } from "../../../../../../locales";
import SearchIcon from "@mui/icons-material/Search";
import { EqualSelect } from "./equalSelect";
import { PickerDate } from "./PickerDate";
import { TFilter } from "../types";
import { Dispatch, SetStateAction, useRef } from "react";
import dayjs from "dayjs";

type TProps = {
  setFilters: Dispatch<SetStateAction<TFilter | undefined>>;
};

export const Filters = ({ setFilters }: TProps) => {
  const { t } = useTranslate();
  const isLaptop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg")
  );
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      date: {
        op: value,
        value: prev?.date?.value ?  prev?.date?.value :  undefined,
      },
    }));
  };

  const onChangeDate = (value: dayjs.Dayjs | null) => {
    setFilters((prev) => ({
      ...prev,
      date: {
        op: prev?.date?.op || "equal",
        value: value ? value : undefined,
      },
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: isLaptop ? "flex-start" : "center",
        flexDirection: isLaptop ? "column" : "row",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <img
          alt="filter by"
          src={"/assests/dashborad/Filter.svg"}
        />
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
          inputRef={inputRef}
          sx={{
            backgroundColor: "rgba(245, 245, 245, 1)",
            borderRadius: "10px",
            width: isMobile ? "250px" : "350px",
            maxWidth: "350px",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    searchByName: inputRef.current?.value,
                  }))
                }}
              >
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
          maxWidth: isMobile ? "250px" : "100%",
          border: "1px solid rgb(188 188 188)",
        }}
      >
        <EqualSelect onChange={onChange} />
        <Divider orientation="vertical" />
        <PickerDate  onChangeDate={onChangeDate}/>
      </Box>
    </Box>
  );
};
