import express from "express";

import patientService from "../services/patientService";

import { NewEntry, NewPatientEntry, Patient } from "../types/types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientService.getEntries());
});

patientsRouter.post("/", (req, res) => {
  const newEntryRequest: NewPatientEntry = req.body as NewPatientEntry;
  const addedEntry: Patient = patientService.addPatientEntry(newEntryRequest);
  res.status(200).json(addedEntry);
});

patientsRouter.get("/:id", (req, res) => {
  res.json(
    patientService.getFullEntries().find((entry) => entry.id === req.params.id)
  );
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const result = patientService.addEntry(req.body as NewEntry, req.params.id);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
    else res.status(500).json(new Error("unknown error"));
  }
});

export default patientsRouter;
