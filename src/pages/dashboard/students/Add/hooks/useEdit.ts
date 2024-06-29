import { useMutation } from "@tanstack/react-query";
import axios from "../../../../../utils/axios";
import { TNewStudent } from "../types";

export const useEdit = () => {
  const EditStudent = async (values: TNewStudent) => {
    const response = await axios.put(
      "https://taxiapp.easybooks.me:8283/Student/Edit",
      values,
    );
    return { property: response.data };
  };
  const mutation = useMutation({mutationFn: EditStudent });

  const handleEditStudent = async (values: TNewStudent) => {
    return await mutation.mutateAsync(values);
  };
  return { ...mutation, handleEditStudent };
};
