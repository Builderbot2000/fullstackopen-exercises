import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from "../types/types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("Incorrect or missing string");
  }
  return string;
};

const parseDate = (date: unknown): string => {
  if (!date || !isDate(date as string)) {
    throw new Error("Incorrect or missing date");
  }
  return date as string;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  console.log("Gender: ", gender);
  if (!gender) {
    throw new Error("Incorrect or missing gender");
  }
  if (gender == "male") return gender as Gender.Male;
  if (gender == "female") return gender as Gender.Female;
  if (gender == "other") return gender as Gender.Other;
  else throw new Error("Gender type not found");
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newPatientEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    typeof healthCheckRating !== "number"
  ) {
    throw new Error("Incorrect or missing data");
  }
  if (
    healthCheckRating != HealthCheckRating.Healthy &&
    healthCheckRating != HealthCheckRating.LowRisk &&
    healthCheckRating != HealthCheckRating.HighRisk &&
    healthCheckRating != HealthCheckRating.CriticalRisk
  )
    throw new Error("Malformatted data");
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object")
    throw new Error("missing data");
  if (!("date" in discharge) || !("criteria" in discharge))
    throw new Error("incomplete data");
  if (!isString(discharge.date) || !isString(discharge.criteria))
    throw new Error("malformatted data");
  return { date: discharge.date, criteria: discharge.criteria };
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes))
    throw new Error("missing data");
  diagnosisCodes.forEach((code: unknown) => {
    if (!code || !isString(code)) {
      throw new Error("Incorrect or missing code");
    }
  });
  return diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object")
    throw new Error("missing data");
  if (!("startDate" in sickLeave) || !("endDate" in sickLeave))
    throw new Error("incomplete data");
  if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate))
    throw new Error("malformatted data");
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    if (object.type === "HealthCheck") {
      if ("healthCheckRating" in object) {
        const newEntry: NewEntry = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          type: "HealthCheck",
        };
        if ("diagnosisCodes" in object)
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        return newEntry;
      }
      throw new Error("healthCheckRating is missing");
    }
    if (object.type === "OccupationalHealthcare") {
      if ("employerName" in object) {
        const newEntry: NewEntry = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          employerName: parseString(object.employerName),
          type: "OccupationalHealthcare",
        };
        if ("diagnosisCodes" in object)
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        if ("sickLeave" in object)
          newEntry.sickLeave = parseSickLeave(object.sickLeave);
        return newEntry;
      }
      throw new Error("employerName is missing");
    }
    if (object.type === "Hospital") {
      if ("discharge" in object) {
        const newEntry: NewEntry = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          discharge: parseDischarge(object.discharge),
          type: "Hospital",
        };
        if ("diagnosisCodes" in object)
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        return newEntry;
      }
      throw new Error("discharge is missing");
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default {
  toNewPatientEntry,
  toNewEntry,
};
