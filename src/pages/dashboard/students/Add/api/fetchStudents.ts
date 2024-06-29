/* eslint-disable no-useless-catch */

import axios from "../../../../../utils/axios";
import { TStudent } from "../../components/Table/types";


export const StudentByIdQuery = (id: string | undefined) => ({
  queryKey: ["studentById"],
  queryFn: async () => fetchData(id),
});

const fetchData = async (id: string | undefined) => {
  try {
    const data = await axios.get<TStudent>(
      `https://taxiapp.easybooks.me:8283/Student/GetyId`, {
        params: {
          Id: id
        }
      }
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};
