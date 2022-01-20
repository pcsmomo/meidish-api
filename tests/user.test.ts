import request from "supertest";
import { app } from "../src/app";
import { User } from "../src/models/user";
import { userOneId, userOne, setupDatabase } from "./fixtures/db";

describe("User model and router", () => {
  beforeEach(setupDatabase);

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Noah",
        email: "noah@example.com",
        password: "pa123!@#",
      })
      .expect(201);
  });
});
