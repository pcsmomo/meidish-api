import request from "supertest";
import { app } from "../src/app";
import { User } from "../src/models/user";

describe("User model and router", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create a new user", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Noah",
        email: "noah@example.com",
        password: "pa123!@#",
      })
      .expect(201);
  });
});
