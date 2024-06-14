import testServer from "../utils/testServer.js";
import userRoutes from "../routes/users.routes.js";
import { createAccessToken } from "../libs/jwt.js";
import ROLES from "../utils/roles.js";

let request;

beforeEach(() => {
  request = testServer(userRoutes);
});

describe("[ routes / users]", () => {
  describe("getUser Admin", () => {
    it("should get a users", async () => {
      // Arrange
      const emailAdmin = { email: process.env.EMAIL_ADMIN };
      const TokenAdmin = await createAccessToken(emailAdmin);

      console.log(TokenAdmin);

      // Act
      const response = await request
        .get("/users")
        .set("Cookie", `token=${TokenAdmin}`); // set token in cookies

      // Assert
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("getUser Users", () => {
    it("should get a users", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const TokenUser = await createAccessToken(emailUser);

      // Act
      const response = await request
        .get("/users")
        .set("Cookie", `token=${TokenUser}`); // set token in cookies

      // Assert
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "You do not have permissions to access this resource",
      });
    });
  });
  describe("getUser", () => {
    it("should get a user by id for the same user", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const TokenAdmin = await createAccessToken(emailUser);

      const userId = Number(process.env.USER_ID); // Suponiendo que este usuario existe en la base de datos

      // Act
      const response = await request
        .get(`/users/${userId}`)
        .set("Cookie", `token=${TokenAdmin}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", userId);
    });
    it("should not get data from a different user", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const TokenUser = await createAccessToken(emailUser);

      const userId = Number(process.env.USER2_ID); // Otro usuario

      // Act
      const response = await request
        .get(`/users/${userId}`)
        .set("Cookie", `token=${TokenUser}`);

      // Assert
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "you don't have permissions",
      });
    });
  });
  describe("updateUser", () => {
    it("should update the user successfully", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const TokenUser = await createAccessToken(emailUser);
      const userId = Number(process.env.USER_ID); // ID del usuario a actualizar

      const updatedData = {
        name: process.env.NAME2,
        email: process.env.EMAIL2,
        password: process.env.PASSWORD2,
        rol: ROLES.USER,
      };
      // Act
      const response = await request
        .put(`/users/${userId}`)
        .set("Cookie", `token=${TokenUser}`)
        .send(updatedData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User updated successfully" });
    });
  });
  describe("deleteUser", () => {
    it("should delete the user successfully", async () => {
      // Arrange
      const emailUser = { email: process.env.DELETE_USER_EMAIL };
      const TokenUser = await createAccessToken(emailUser);
      const userId = Number(process.env.ID_DELETE_USER); // ID del usuario a eliminar
  
      // Act
      const response = await request
        .delete(`/users/${userId}`)
        .set("Cookie", `token=${TokenUser}`);
  
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User deleted successfully" });
  
      // Verify that the user was actually deleted
      const verifyResponse = await request
        .get(`/users/${userId}`)
        .set("Cookie", `token=${TokenUser}`);
      expect(verifyResponse.status).toBe(404);
    });
  });
  describe("Update User Schema validation", () => {
    it("should fail the update user schema validation", async () => {
      const requestBody = {
        name: "a", // name is too short
        email: "not an email", // not a valid email
        password: "123", // password is too short
        rol: "invalid role" // not a valid role
      };
  
      const response = await request.post("/users").send(requestBody);

      expect(response.status).toBe(400);
    });
  });
});
