import { HealthCheckRating } from "../types/types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const parseHealthCheckRating = (value: string): HealthCheckRating => {
  switch (value) {
    case "0":
      return HealthCheckRating.Healthy;
    case "1":
      return HealthCheckRating.LowRisk;
    case "2":
      return HealthCheckRating.HighRisk;
    case "3":
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error("Invalid health check rating");
  }
};
