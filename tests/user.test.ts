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

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assert the response
    expect(user).toMatchObject({
      name: "Noah",
      email: "noah@example.com",
    });

    expect(user!.password).not.toBe("pa123!@#");
  });

  it("should login existing user", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });
});
