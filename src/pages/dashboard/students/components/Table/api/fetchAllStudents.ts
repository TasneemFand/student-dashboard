/* eslint-disable no-useless-catch */

import axios from "../../../../../../utils/axios";
import { TStudent } from "../types";


export const StudentsTableQuery = () => ({
  queryKey: ["AllStudents"],
  queryFn: async () => fetchData(),
});

const fetchData = async () => {
  try {
    const data = await axios.get<TStudent[]>(
      "https://taxiapp.easybooks.me:8283/Student/GetAll"
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};
