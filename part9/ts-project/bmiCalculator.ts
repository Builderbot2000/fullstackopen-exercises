import { parseBmiArguments } from "./utils/parseArguments";

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 18.4) return "Underweight";
  if (bmi > 18.5 && bmi < 24.9) return "Normal (healthy weight)";
  if (bmi > 25.0 && bmi < 29.9) return "Overweight (pre-obese)";
  if (bmi > 30.0) return "Obese";
  return "Undefined!";
};

try {
  const [height, weight] = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
