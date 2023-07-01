import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import {
  Patient,
  EntryType,
  NewEntry,
  SickLeave,
  Discharge,
} from "../../types/types";
import patientService from "../../services/patients";
import { allDiagnoses } from "../../constants";
import { parseHealthCheckRating } from "../../utils/utils";

const NewEntryForm = ({
  patient,
  setPatient,
  setErrorMessage,
}: {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [mode, setMode] = useState<EntryType>(EntryType.HealthCheck);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [criteria, setCriteria] = useState<string>("");

  const notifyError = (message: string, duration: number) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, duration);
  };

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setDescription("");
    setDate(null);
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes([]);
    setEmployerName("");
    setStartDate(null);
    setEndDate(null);
    setDischargeDate(null);
    setCriteria("");
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newEntryObject: NewEntry;
    switch (mode) {
      case EntryType.HealthCheck:
        newEntryObject = {
          type: "HealthCheck",
          description: description,
          date: date ? date.toString() : "N/A",
          specialist: specialist,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
          diagnosisCodes: diagnosisCodes,
        };
        break;
      case EntryType.OccupationalHealthcare:
        newEntryObject = {
          type: "OccupationalHealthcare",
          description: description,
          date: date ? date.toString() : "N/A",
          specialist: specialist,
          employerName: employerName,
          sickLeave:
            startDate && endDate
              ? ({
                  startDate: startDate.toString(),
                  endDate: endDate.toString(),
                } as SickLeave)
              : undefined,
          diagnosisCodes: diagnosisCodes,
        };
        break;
      case EntryType.Hospital:
        newEntryObject = {
          type: "Hospital",
          description: description,
          date: date ? date.toString() : "N/A",
          specialist: specialist,
          discharge: {
            date: dischargeDate?.toString(),
            criteria: criteria,
          } as Discharge,
          diagnosisCodes: diagnosisCodes,
        };
        break;
      default:
        throw new Error("Unknown form mode");
    }
    try {
      const newEntry = await patientService.addEntry(
        patient.id,
        newEntryObject
      );
      if (newEntry)
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      else notifyError("Error: new entry undefined", 1000);
    } catch (error) {
      if (error instanceof Error)
        notifyError("Error: ".concat(error.message), 1000);
      else notifyError("Error: unknown error", 1000);
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Select entry type</FormLabel>
        <RadioGroup row>
          <FormControlLabel
            value="healthCheck"
            control={<Radio />}
            label="HealthCheck"
            onClick={() => {
              setMode(EntryType.HealthCheck);
            }}
            checked={mode === EntryType.HealthCheck ? true : false}
          />
          <FormControlLabel
            value="occupationalHealthcare"
            control={<Radio />}
            label="Occupational Healthcare"
            onClick={() => {
              setMode(EntryType.OccupationalHealthcare);
            }}
            checked={mode === EntryType.OccupationalHealthcare ? true : false}
          />
          <FormControlLabel
            value="hospital"
            control={<Radio />}
            label="Hospital"
            onClick={() => {
              setMode(EntryType.Hospital);
            }}
            checked={mode === EntryType.Hospital ? true : false}
          />
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          border: 1,
          borderRadius: 0.5,
          borderStyle: "dashed",
          m: 0.5,
          p: 0.5,
          pl: 3,
        }}
      >
        <h3>New Entry</h3>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <TextField
              size="small"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <FormLabel>Date</FormLabel>
            <DatePicker
              label="Select date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
            <FormLabel>Specialist</FormLabel>
            <TextField
              size="small"
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
            />
            <FormLabel>Diagnosis Codes</FormLabel>
            <Select
              label="Select diagnosis code"
              multiple
              value={diagnosisCodes}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: string[]) => selected.join(", ")}
              onChange={handleDiagnosisCodesChange}
            >
              {allDiagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox
                    checked={diagnosisCodes.indexOf(diagnosis.code) > -1}
                  />
                  <ListItemText
                    primary={diagnosis.code}
                    secondary={diagnosis.name}
                  />
                </MenuItem>
              ))}
            </Select>
            <div hidden={mode === EntryType.HealthCheck ? false : true}>
              <div>
                <FormLabel>Healthcheck Rating</FormLabel>
              </div>
              <div>
                <TextField
                  sx={{ width: 40 }}
                  size="small"
                  value={healthCheckRating}
                  onChange={(event) => setHealthCheckRating(event.target.value)}
                />
              </div>
            </div>
            <div
              hidden={mode === EntryType.OccupationalHealthcare ? false : true}
            >
              <div>
                <FormLabel>Employee Of</FormLabel>
              </div>
              <div>
                <TextField
                  size="small"
                  value={employerName}
                  onChange={(event) => setEmployerName(event.target.value)}
                />
              </div>
              <div>
                <FormLabel>Sick Leave</FormLabel>
              </div>
              <div>
                <Box sx={{ ml: 2, mt: 1 }}>
                  <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                  />{" "}
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </Box>
              </div>
            </div>
            <div hidden={mode === EntryType.Hospital ? false : true}>
              <div>
                <FormLabel>Discharge Date</FormLabel>
              </div>
              <div>
                <DatePicker
                  sx={{ mt: 1 }}
                  label="Select discharge date"
                  value={dischargeDate}
                  onChange={(date) => setDischargeDate(date)}
                />
              </div>
              <div>
                <FormLabel>Discharge Criteria</FormLabel>
              </div>
              <div>
                <TextField
                  size="small"
                  value={criteria}
                  onChange={(event) => setCriteria(event.target.value)}
                />
              </div>
            </div>
            <Grid container spacing={0}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Add</Button>
            </Grid>
          </FormControl>
        </form>
      </Box>
    </div>
  );
};

export default NewEntryForm;
