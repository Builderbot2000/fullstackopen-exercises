import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiaryEntry) => {
  try {
    const { data } = await axios.post<DiaryEntry>(
      `${apiBaseUrl}/diaries`,
      object
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Response: ", error.response);
      if (error.response) throw new AxiosError(error.response.data);
      else throw new AxiosError("Error Unknown!");
    } else {
      console.error(error);
    }
  }
};

export default {
  getAll,
  create,
};
