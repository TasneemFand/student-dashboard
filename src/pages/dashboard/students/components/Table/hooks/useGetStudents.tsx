import { useQuery } from "@tanstack/react-query";
import { StudentsTableQuery } from "../api/fetchAllStudents";

export const useGetStudents = () => {
  const {
    data: studentsData,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    ...StudentsTableQuery(),
  });

  return {
    studentsData,
    isLoading,
    isError,
    isRefetching,
    refetch
  };
};
