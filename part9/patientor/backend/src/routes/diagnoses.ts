import express from "express";

import diagnoseService from "../services/diagnoseService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.json(diagnoseService.getEntries());
});

export default diagnosesRouter;
