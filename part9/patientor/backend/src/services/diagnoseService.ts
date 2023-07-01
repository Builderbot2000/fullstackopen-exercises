import data from "../../data/diagnoses";

import { Diagnosis } from "../types/types";

const dataEntries: Diagnosis[] = data;

const getEntries = (): Diagnosis[] => {
  return dataEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
