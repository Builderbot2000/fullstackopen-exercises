/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (
    !req.query.weight ||
    !req.query.height ||
    isNaN(Number(req.query.weight)) ||
    isNaN(Number(req.query.height))
  ) {
    res.json({ error: "malformatted parameters" });
  }
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const bmi = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.json({ error: "parameters missing" });
    return;
  }
  const dailyExercisesArg = req.body.daily_exercises as Array<string>;
  if (dailyExercisesArg.filter((day) => isNaN(Number(day))).length != 0) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const dailyExercises = dailyExercisesArg.map((day: string) => Number(day));
  const targetArg = req.body.target as string;
  if (isNaN(Number(targetArg))) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const target = Number(targetArg);
  res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
