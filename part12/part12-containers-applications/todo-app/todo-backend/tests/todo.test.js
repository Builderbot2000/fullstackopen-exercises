const router = require("../routes/todos"); // Adjust the path accordingly
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { Todo } = require("../mongo"); // Adjust the path accordingly

const app = express();
app.use(bodyParser.json());
app.use("/todos", router);

describe("Single Todo Router", () => {
  const mockTodo = {
    _id: "507f191e810c19729de860ea",
    text: "Test todo",
    done: false,
  };

  beforeAll((done) => {
    done();
  });

  beforeEach(() => {
    // Mock Todo.findById
    Todo.findById = jest.fn().mockImplementation((id) => {
      if (id === mockTodo._id) {
        return Promise.resolve(mockTodo);
      } else {
        return Promise.resolve(null);
      }
    });

    // Mock Todo.findByIdAndUpdate
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(mockTodo);

    // Mock Todo.findByIdAndDelete
    Todo.findByIdAndDelete = jest.fn().mockResolvedValue(mockTodo);
  });

  it("should get a single todo", async () => {
    const response = await request(app).get("/todos/507f191e810c19729de860ea");
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("Test todo");
  });

  it("should update a single todo", async () => {
    const updatedData = { text: "Updated todo", done: true };
    const response = await request(app)
      .put("/todos/507f191e810c19729de860ea")
      .send(updatedData);
    expect(response.status).toBe(200);
  });

  it("should delete a single todo", async () => {
    const response = await request(app).delete(
      "/todos/507f191e810c19729de860ea"
    );
    expect(response.status).toBe(200);

    // Verify that Todo.findById was called
    expect(Todo.findById).toHaveBeenCalledWith("507f191e810c19729de860ea");

    // Verify that Todo.findByIdAndDelete was called
    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(
      "507f191e810c19729de860ea"
    );
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
