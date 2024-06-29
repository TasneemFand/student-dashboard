import { useMutation } from "@tanstack/react-query";
import axios from "../../../../../utils/axios";
import { TNewStudent } from "../types";

export const useCreateStudent = () => {
  const createStudent = async (values: TNewStudent) => {
    const response = await axios.post(
      "https://taxiapp.easybooks.me:8283/Student/Add",
      values,
    );
    return { property: response.data };
  };
  const mutation = useMutation({mutationFn: createStudent });

  const handleCreateStudent = async (values: TNewStudent) => {
    return await mutation.mutateAsync(values);
  };
  return { ...mutation, handleCreateStudent };
};
