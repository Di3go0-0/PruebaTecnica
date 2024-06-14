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

    it("should not create a project with empty required fields", async () => {
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
    it("should fail the create schema validation", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "",
        description: "",
        startDate: "",
        finalDate: "2024-07-10",
        state: "no started",
      };

      // Act
      const response = await request
        .post("/projects")
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
    });
  });
  describe("get projects", () => {
    if (
      ("should get all projects for the authenticated user",
      async () => {
        const emailUser = { email: process.env.EMAIL_USER };
        const tokenUser = await createAccessToken(emailUser);

        const response = await request
          .get("/projects")
          .set("Cookie", `token=${tokenUser}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      })
    );
  });
  describe("get project by id", () => {
    it (
      ("shoutl get a project by id",
      async () => {
        const emailUser = { email: process.env.EMAIL_USER };
        const tokenUser = await createAccessToken(emailUser);

        const idProject = process.env.ID_PROJECT;

        const response = await request
          .get(`/projects/${idProject}`)
          .set("Cookie", `token=${tokenUser}`);

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");
      })
    );
    it("should return 404 if project not found", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = 99999999999; // ID that does not exist

      const response = await request
        .get(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Project not found" });
    });
  });

  describe("search a project", () => {
    it("should return 20 with a project ", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const type = "description";
      const content = "first";

      const response = await request
        .get(`/projects/search?type=${type}&content=${content}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
    it("should return 404 if projects not found", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const type = "description";
      const content = "sdfadfasdfasdf";

      const response = await request
        .get(`/projects/search?type=${type}&content=${content}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Projects not found" });
    });
  });
  describe("get project by id", () => {
    it("should return 200 with a project", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = process.env.ID_PROJECT; // ID existente 

      const response = await request
        .get(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    it("should return 404 if project not found", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = 99999999999; // ID that does not exist

      const response = await request
        .get(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Project not found" });
    });
  });

  describe("delete project by id", () => {
    it("should return 200 ", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = process.env.ID_PROJECT; // ID existente 

      const response = await request
        .delete(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Project deleted successfully" });
    });

    it("should return 404 if project not found", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = 99999999999; // ID that does not exist

      const response = await request
        .delete(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Project not found" });
    });

    it("should return 400 if project has tasks", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const idProject = process.env.ID_PROJECT2; // ID that does not exist

      const response = await request
        .delete(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "You cannot delete a project that has tasks" });
    });
  });


  describe("update a project", () => {
    it("should update a project successfully", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "New Project",
        description: "Description of the new project",
        startDate: "2024-07-01",
        finalDate: "2024-07-10",
        state: "In progress",
      };

      const idProject  = 2

      // Act
      const response = await request
        .put(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        "Project updated successfully"
      );
    });

    it("should not update a project with a start date before the current date", async () => {
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
      
      const idProject  = 2

      // Act
      const response = await request
        .put(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "The start date must be equal to or later than the current date"
      );
    });

    it("should not update a project with an end date before or equal to the start date", async () => {
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

      const idProject  = 2

      // Act
      const response = await request
        .put(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "The end date must be later than the start date"
      );
    });

    it("should not update a project with missing required fields", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        description: "Description of the new project",
        startDate: "2024-07-10",
        finalDate: "2024-07-20",
        state: "No started",
      };
      const idProject  = 2

      // Act
      const response = await request
        .put(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Project name is required");
    });

    it("should fail the update schema validation", async () => {
      // Arrange
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const requestBody = {
        name: "",
        description: "sdfect",
        startDate: "2024-0sdfd7-10",
        finalDate: "2024-07sdf-20",
        state: "No startsdsded",
      };
      const idProject  = 2

      // Act
      const response = await request
        .put(`/projects/${idProject}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(requestBody);


      // Assert
      expect(response.status).toBe(400);
    });
    
  });
});
