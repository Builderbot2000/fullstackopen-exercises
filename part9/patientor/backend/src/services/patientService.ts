import { v1 as uuid } from "uuid";

import data from "../../data/patients";

import {
  NewPatientEntry,
  Patient,
  NonSensitivePatient,
  NewEntry,
  Entry,
} from "../types/types";
import utils from "../utils/utils";

const dataEntries: NonSensitivePatient[] = data;
const fullDataEntries: Patient[] = data;

const getEntries = (): NonSensitivePatient[] => {
  return dataEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getFullEntries = (): Patient[] => {
  return fullDataEntries.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatientEntry = (newPatientEntryRequest: NewPatientEntry): Patient => {
  const newPatientEntryObject: NewPatientEntry = utils.toNewPatientEntry(
    newPatientEntryRequest
  );
  const newPatientEntry: Patient = {
    ...newPatientEntryObject,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
  };
  data.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (newEntryRequest: NewEntry, id: string): Entry => {
  const newEntryObject: NewEntry = utils.toNewEntry(newEntryRequest);
  const newEntry: Entry = {
    ...newEntryObject,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid(),
  };
  const targetPatient = data.find((patient) => patient.id === id);
  if (!targetPatient) throw new Error("Target patient not found");
  targetPatient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getFullEntries,
  addPatientEntry,
  addEntry,
};
