import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types/types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, object: NewEntry) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if ("response" in error && error.response)
        throw new Error(error.response.data);
      else throw new Error("Unknown Error");
    }
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getById,
  create,
  addEntry,
};
