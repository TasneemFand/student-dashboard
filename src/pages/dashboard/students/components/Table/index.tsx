import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { Filters } from "./filters/filters";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_SortingState,
} from "material-react-table";
import { useEffect, useState } from "react";
import { useColumns } from "./tableCols";
import { useGetStudents } from "./hooks/useGetStudents";
import { useLocales } from "../../../../../locales";
import { TMappedStudent } from "./types";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_AR } from "material-react-table/src/locales/ar";
import { useNavigate } from "react-router-dom";

const StudentsTable = () => {
  const columns = useColumns();
  const { studentsData, isLoading } = useGetStudents();

  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const { currentLang } = useLocales();
  const navigate = useNavigate();

  const [data, setData] = useState<TMappedStudent[]>([]);

  useEffect(() => {
    if (studentsData) {
      setData(
        studentsData.map((item) => ({
          ...item,
          grade:
            currentLang.value === "en"
              ? item.grade.translations?.[0]?.name || ""
              : item.grade.translations?.[1]?.name || "",
          gender:
            currentLang.value === "en"
              ? item.gender.translations?.[1]?.name || ""
              : item.gender.translations?.[0]?.name || "",
        }))
      );
    } else setData([]);
  }, [currentLang.value, isLoading, studentsData]);

  const table = useMaterialReactTable({
    columns,
    data,
    /** basics */
    layoutMode: "semantic",
    enablePagination: true,
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    columnResizeDirection: currentLang.value === "en" ? "ltr" : "rtl",
    localization:
      currentLang.value === "en" ? MRT_Localization_EN : MRT_Localization_AR,
    paginationDisplayMode: "pages",
    enableColumnActions: false,
    enableStickyHeader: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 65,
        grow: false,
      },
    },
    state: {
      isLoading,
      sorting,
      showLoadingOverlay: false,
    },
    initialState: {
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    /** column pinning */
    enableColumnPinning: true,
    /** column resizing */
    enableColumnResizing: true,
    columnResizeMode: "onEnd", //instead of the default "onChange" mode
    /** row actions */
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({row}) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => navigate(`delete/${row.original.id}`)}>
            <img src={"/dashboard/students/assests/dashborad/bin.svg"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => navigate(`edit/${row.original.id}`)}>
            <img src={"/dashboard/students/assests/dashborad/pencil.svg"} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    /** sorting */
    onSortingChange: setSorting,
    enableMultiSort: true,
    isMultiSortEvent: () => true, //multi-sorting will be the default click behavior without the need to hold shift
    enableToolbarInternalActions: false,
    /** styles */
    muiTopToolbarProps: {
      sx: {
        display: "none",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        whiteSpace: "normal",
      },
    },
    muiTablePaperProps: {
      sx: {
        maxWidth: "100%",
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: `clamp(350px, calc(100vh - 375px), 9999px)`,
      },
    },
  });
  return (
    <Box sx={{ marginTop: 2 }}>
      <Filters />
      <Divider
        sx={{
          color: "rgba(153, 153, 153, 0.37)",
          height: "30px",
        }}
      />
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default StudentsTable;
