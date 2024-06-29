import { useQuery } from "@tanstack/react-query";
import { StudentByIdQuery } from "../api/fetchStudents";
import { useParams } from "react-router-dom";

export const useGetStudentById = () => {
    const {id} = useParams();
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    ...StudentByIdQuery(id),
  });

  return {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch
  };
};
