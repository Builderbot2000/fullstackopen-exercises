import { parseExerciseArguments } from "./utils/parseArguments";

type rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: Array<number>,
  targetHours: number
): Result => {
  const average =
    dailyHours.reduce((pSum, curr) => pSum + curr) / dailyHours.length;
  const success = average >= targetHours ? true : false;
  let rating: rating;
  let ratingDescription;
  if (average < 0.9 * targetHours) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average < 1.2 * targetHours) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "well done";
  }
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((day) => day > 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: average,
  };
};

try {
  const [dailyHours, targetHours] = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
