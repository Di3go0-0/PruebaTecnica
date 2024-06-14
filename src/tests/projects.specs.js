import testServer from "../utils/testServer.js";
import projectsRoutes from "../routes/projects.routes.js";
import { createAccessToken } from "../libs/jwt.js";

let request;

beforeEach(() => {
  request = testServer(projectsRoutes);
});

describe("[ routes / projects ]", () => {
  describe("create project", () => {
    it("should create a project successfully", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "New Project",
        description: "Description of the new project",
        startDate: "2024-07-01",
        finalDate: "2024-07-10",
        state: "No started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(201);
    });

    it("should not create a project with a start date before the current date", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "New Project",
        description: "Description of the new project",
        startDate: "2023-06-01",
        finalDate: "2024-07-10",
        state: "No started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "The start date must be equal to or later than the current date"
      );
    });

    it("should not create a project with an end date before or equal to the start date", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "New Project",
        description: "Description of the new project",
        startDate: "2024-07-10",
        finalDate: "2024-07-10",
        state: "No started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "The end date must be after the start date"
      );
    });

    it("should not create a project with missing required fields", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        description: "Description of the new project",
        startDate: "2024-07-10",
        finalDate: "2024-07-20",
        state: "No started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Project name is required");
    });

    it(" ", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "",
        description: "Description of the new project",
        startDate: "2024-07-10",
        finalDate: "2024-07-20",
        state: "No started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Project name is empty");
    });
  });
});
