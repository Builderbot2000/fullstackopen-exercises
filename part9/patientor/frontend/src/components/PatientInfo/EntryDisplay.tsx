import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Diagnosis, Entry, HealthCheckRating } from "../../types/types";
import { assertNever } from "../../utils/utils";

const EntryDisplay = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[] | null;
}): JSX.Element => {
  const typeIcon = (type: string): JSX.Element | null => {
    switch (type) {
      case "HealthCheck":
        return <MedicalServicesIcon />;
      case "OccupationalHealthcare":
        return <WorkIcon />;
      case "Hospital":
        return <LocalHospitalIcon />;
      default:
        return null;
    }
  };

  const ratingIcon = (healthCheckRating: HealthCheckRating): JSX.Element => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon color="success" />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon color="secondary" />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon color="warning" />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon color="error" />;
      default:
        return assertNever(healthCheckRating);
    }
  };

  return (
    <div>
      <Box sx={{ border: 1, borderRadius: 1, m: 0.5, p: 0.5 }}>
        <div>
          {entry.date}
          {typeIcon(entry.type)}
          {entry.type === "OccupationalHealthcare" ? entry.employerName : null}
        </div>
        <div>{entry.description}</div>
        <div>
          {entry.type === "HealthCheck"
            ? ratingIcon(entry.healthCheckRating)
            : null}
        </div>
        <div>
          <ul>
            {entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses?.find(
                    (diagnosisSample) => diagnosisSample.code === code
                  );
                  if (!diagnosis || diagnosis === undefined)
                    return <li key={code}>Unknown diagnosis</li>;
                  else
                    return (
                      <li key={diagnosis.code}>
                        {diagnosis.code}
                        {"  "} {diagnosis.name}
                      </li>
                    );
                })
              : null}
          </ul>
        </div>
        <div>Diagnosis by {entry.specialist}</div>
      </Box>
    </div>
  );
};

export default EntryDisplay;
