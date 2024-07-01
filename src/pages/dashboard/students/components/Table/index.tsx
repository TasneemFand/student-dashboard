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
import { TFilter, TMappedStudent } from "./types";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_AR } from "material-react-table/src/locales/ar";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const StudentsTable = () => {
  const columns = useColumns();
  const { studentsData, isLoading } = useGetStudents();

  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const { currentLang } = useLocales();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<TFilter>();

  const [data, setData] = useState<TMappedStudent[]>([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (studentsData) {
      setData(
        studentsData.map((item) => {
          return {
            ...item,
            grade:
              currentLang.value === "en"
                ? item.grade?.translations?.[0]?.name || ""
                : item.grade?.translations?.[1]?.name || "",
            gender:
              currentLang.value === "en"
                ? item.gender?.translations?.[1]?.name || ""
                : item.gender?.translations?.[0]?.name || "",
          };
        })
      );
      setLocalLoading(false);
    }
  }, [currentLang.value, isLoading, studentsData]);

  const filterData = (filters: TFilter) => {
    const allData = studentsData?.map((item) => ({
      ...item,
      grade:
        currentLang.value === "en"
          ? item.grade?.translations?.[0]?.name || ""
          : item.grade?.translations?.[1]?.name || "",
      gender:
        currentLang.value === "en"
          ? item.gender?.translations?.[1]?.name || ""
          : item.gender?.translations?.[0]?.name || "",
    }));
    if (filters?.date?.value) {
      const f = allData?.filter((item) => {
        const dateValue = dayjs(new Date(item.birthDate));
        let condition = dateValue.isSame(filters?.date?.value, "day");
        switch (filters?.date?.op) {
          case "equal":
            condition = dateValue.isSame(filters?.date?.value, "day");
            break;
          case "greater":
            condition = dateValue.isAfter(filters?.date?.value, "day");
            break;
          case "less":
            condition = dateValue.isBefore(filters?.date?.value, "day");
            break;
        }
        const nameCondition = filters?.searchByName
          ? item.firstName?.toLowerCase().includes(filters.searchByName.toLowerCase()) ||
            item.lastName?.toLowerCase().includes(filters.searchByName.toLowerCase())
          : true;

        return nameCondition && condition;
      });
      return f;
    }

    if (filters.searchByName) {
      return allData?.filter((item) => {
        let condition = true;
        if (filters.date?.value) {
          const dateValue = dayjs(item.birthDate);
          switch (filters?.date?.op) {
            case "equal":
              condition = dateValue.isSame(filters?.date?.value);
              return;
            case "greater":
              condition = dateValue.isAfter(filters?.date?.value);
              return;
            case "less":
              condition = dateValue.isBefore(filters?.date?.value);
              return;
          }
        }
        return (
          condition &&
          (item.firstName?.toLowerCase().includes(filters.searchByName!.toLowerCase()) ||
            item.lastName?.toLowerCase().includes(filters.searchByName!.toLowerCase()))
        );
      });
    }

    return studentsData?.map((item) => ({
      ...item,
      grade:
        currentLang.value === "en"
          ? item.grade?.translations?.[0]?.name || ""
          : item.grade?.translations?.[1]?.name || "",
      gender:
        currentLang.value === "en"
          ? item.gender?.translations?.[1]?.name || ""
          : item.gender?.translations?.[0]?.name || "",
    }));
  };

  useEffect(() => {
    if (data && filters) {
      const filteredData = filterData(filters);
      setData(filteredData!);
    }
  }, [filters?.date?.op, filters?.date?.value, filters?.searchByName]);

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
      isLoading: isLoading || localLoading,
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => navigate(`delete/${row.original.id}`)}
          >
            <img src={"/assests/dashborad/bin.svg"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => navigate(`edit/${row.original.id}`)}
          >
            <img src={"/assests/dashborad/pencil.svg"} />
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
      <Filters setFilters={setFilters} />
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
