import request from "supertest";
import { app } from "../src/app";
import { User, UserDocument } from "../src/models/user";
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

    // only for type guard
    if (!user || (user && !user.tokens[0])) return;

    // Assert the response
    expect(user).toMatchObject({
      user: {
        name: "Noah",
        email: "noah@example.com",
      },
      token: user.tokens[0].token,
    });

    expect(user.password).not.toBe("pa123!@#");
  });

  it("should sign in existing user", async () => {
    const response = await request(app)
      .post("/users/signin")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const user = await User.findById(userOneId);

    // only for type guard
    if (!user || (user && !user.tokens[1])) return;

    expect(response.body.token).toBe(user.tokens[1].token);
  });
});
