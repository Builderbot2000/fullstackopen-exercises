import { useState, useEffect } from "react";
import { Diagnosis, Gender, Patient } from "../../types/types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { assertNever } from "../../utils/utils";
import EntryDisplay from "./EntryDisplay";
import NewEntryForm from "./NewEntryForm";
import ErrorNotification from "./ErrorNotification";

const PatientInfo = ({ id }: { id: string | null }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const queryPatient = async () => {
      if (id) {
        const patientResponse = await patientService.getById(id);
        setPatient(patientResponse);
        const diagnosesResponse = await diagnosesService.getAll();
        setDiagnoses(diagnosesResponse);
      }
    };
    queryPatient();
  }, [id]);

  if (!patient || !id)
    return (
      <div>
        <br />
        <b>Patient does not exist!</b>
      </div>
    );

  if (patient === undefined)
    return (
      <div>
        <br />
        <b>Patient is undefined!</b>
      </div>
    );

  const genderIcon = (gender: Gender): JSX.Element => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return assertNever(gender);
    }
  };

  return (
    <div>
      <br />
      <div>
        <h1>
          {patient.name} {"  "}
          {genderIcon(patient.gender)}
        </h1>
        <div>SSN: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
      </div>
      <br />
      <ErrorNotification message={errorMessage} />
      <NewEntryForm
        patient={patient}
        setPatient={setPatient}
        setErrorMessage={setErrorMessage}
      />
      <h3>
        <p>
          <b>Entries</b>
        </p>
      </h3>
      {patient.entries.map((entry) => (
        <EntryDisplay key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientInfo;
