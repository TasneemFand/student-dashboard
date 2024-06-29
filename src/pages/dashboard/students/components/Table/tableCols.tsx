import { useMemo } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import { TMappedStudent } from "./types";
import { useTranslate } from "../../../../../locales";
import dayjs from "dayjs";

export const useColumns = () => {
  const { t } = useTranslate();
  return useMemo<MRT_ColumnDef<TMappedStudent>[]>(
    () => [
      {
        id: "firstName",
        accessorKey: "firstName",
        header: t("firstName"),
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: t("lastName"),
      },
      {
        accessorFn: (row) => new Date(row?.birthDate),
        id: "birthDate",
        accessorKey: "birthDate",
        header: t("birthDate"),
        Cell: ({ cell }) => dayjs(cell.getValue<string>()).format('YYYY-MM-DD'),
      },
      {
        id: "grade",
        accessorKey: "grade",
        header: t("grade"),
      },
      {
        accessorKey: "gender",
        header: t("gender"),
        id: "gender",
      },
      {
        id: "country",
        accessorKey: "country",
        header: t("country"),
      },
      {
        id: "city",
        header: t("city"),
        accessorKey: "city",
      },
      {
        id: "phone",
        header: t("Mobile"),
        accessorKey: "phone"
      },
      {
        id: "remarks",
        accessorKey: "remarks",
        header: t("Notes")
      }
    ],
    [t]
  );
};
