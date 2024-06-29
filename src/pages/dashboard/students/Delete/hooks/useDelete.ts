import { useMutation } from "@tanstack/react-query";
import axios from "../../../../../utils/axios";
import { useParams } from "react-router-dom";

export const useDelete = () => {
  const { id } = useParams();
  
  const EditStudent = async () => {
    const response = await axios.delete(
      "https://taxiapp.easybooks.me:8283/Student/Remove",
      {
        params: {
            Id: id
        },
      }
    );
    return { property: response.data };
  };
  const mutation = useMutation({ mutationFn: EditStudent });

  const handleDeleteStudent = async () => {
    return await mutation.mutateAsync();
  };
  return { ...mutation, handleDeleteStudent };
};
