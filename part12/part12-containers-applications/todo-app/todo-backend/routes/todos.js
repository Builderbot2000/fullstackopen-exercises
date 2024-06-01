const express = require("express");
const { Todo } = require("../mongo");
const { setAsync, getAsync } = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let prev = await getAsync("counter");
  console.log(prev);
  if (!prev || prev === "NaN") prev = 0;
  await setAsync("counter", parseInt(prev) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await Todo.findByIdAndDelete(req.todo._id);
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  // console.log("GET ID:", req.todo);
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  // console.log("PUT ID ", req.todo, " WITH ", req.body);
  await Todo.findByIdAndUpdate(req.todo.id, {
    text: req.body.text,
    done: req.body.done,
  });
  // console.log("UPDATED");
  res.sendStatus(200);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
