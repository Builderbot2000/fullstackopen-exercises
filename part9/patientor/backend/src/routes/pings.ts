import express from "express";

const pingRouter = express.Router();

pingRouter.get("/", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

pingRouter.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default pingRouter;
