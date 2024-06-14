import testServer from "../utils/testServer.js";
import taskRoutes from "../routes/task.routes.js";
import { createAccessToken } from "../libs/jwt.js";

let request;
beforeEach(() => {
  request = testServer(taskRoutes);
});

describe("[ routes / tasks ]", () => {
  describe("GET /tasks", () => {
    it("should get all tasks for the authenticated user", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      console.log(tokenUser)

      const response = await request
          .get("/tasks")
          .set("Cookie", `token=${tokenUser}`);

          expect(response.status).toBe(200);
    });

    it("should return 403 if user is not authenticated", async () => {
      const response = await request.get("/tasks");

      expect(response.status).toBe(403);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask = {
        name: "New Task",
        description: "This is a new task",
        projectId: 1,
      };
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const response = await request
        .post("/tasks")
        .set("Cookie", `token=${tokenUser}`)
        .send(newTask);

      expect(response.status).toBe(200);
    });

    it("should return 403 if user does not have permission to create a task", async () => {
      const newTask = {
        name: "New Task",
        description: "This is a new task",
        state: "Pending",
        projectId: 2, // Assuming the user does not have permission for this project
      };

      const emailUser = { email: process.env.EMAIL_ADMIN };
      const tokenUser = await createAccessToken(emailUser);
      const response = await request

        .post("/tasks")
        .set("Cookie", `token=${tokenUser}`)
        .send(newTask);

      expect(response.status).toBe(403);
    });

    it("should return 404 if project does not exist", async () => {
      const newTask = {
        name: "New Task",
        description: "This is a new task",
        state: "Pending",
        projectId: 999, // Assuming the project does not exist
      };
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);

      const response = await request
        .post("/tasks")
        .set("Cookie", `token=${tokenUser}`)
        .send(newTask);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /tasks/:id", () => {
    it("should get a task by id for the authenticated user", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const id = 2; 
      const response = await request
        .get(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 403 if user does not have permission to get the task", async () => {
      const emailUser = { email: process.env.EMAIL_ADMIN };
      const tokenUser = await createAccessToken(emailUser);
      const id = 2; 
      const response = await request
        .get(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(403);
    });

    it("should return 404 if task does not exist", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const id = 999; 
      const response = await request
        .get(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update a task for the authenticated user", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const updatedTask = {
        name: "Updated Task",
        description: "This is an updated task",
        state: "Completed"

      };
      const id = 2; 

      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(updatedTask);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Task updated successfully"
      );
    });

    it("should return 403 if user does not have permission to update the task", async () => {
      const emailUser = { email: process.env.EMAIL_ADMIN };
      const tokenUser = await createAccessToken(emailUser);
      const updatedTask = {
        name: "Updated Task",
        description: "This is an updated task",
        state: "Completed",
      };
      const id = 2; 

      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(updatedTask);

      expect(response.status).toBe(403);
    });

    it("should return 404 if task does not exist", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const updatedTask = {
        name: "Updated Task",
        description: "This is an updated task",
        state: "Completed",
      };
      const id = 999; 

      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`)
        .send(updatedTask);

      expect(response.status).toBe(404);
    });
    it("should return 400 if don't use the schema correctly ", async () => {
        const emailUser = { email: process.env.EMAIL_USER };
        const tokenUser = await createAccessToken(emailUser);
        const updatedTask = {
          name: "Updated Task",
          description: "This is an updated task",
          state: "completed",
        };
        const id = 2; 

      const response = await request
        .delete(`/tasks/${id}`)
          .set("Cookie", `token=${tokenUser}`)
          .send(updatedTask);
  
        expect(response.status).toBe(400);
      });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task for the authenticated user", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const id = 3; 

      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Task deleted successfully"
      );
    });

    it("should return 403 if user does not have permission to delete the task", async () => {
      const emailUser = { email: process.env.EMAIL_ADMIN };
      const tokenUser = await createAccessToken(emailUser);
      const id = 5; // Assuming the user does not have permission to delete this task
      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(403);
    });

    it("should return 404 if task does not exist", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const id = 999; 

      const response = await request
        .delete(`/tasks/${id}`)
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /tasks/search", () => {
    it("should search tasks by name for the authenticated user", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const response = await request
        .get("/tasks/search?type=name&content=task")
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 404 if no tasks match the search criteria", async () => {
      const emailUser = { email: process.env.EMAIL_USER };
      const tokenUser = await createAccessToken(emailUser);
      const response = await request
        .get("/tasks/search?type=name&content=nonexistent")
        .set("Cookie", `token=${tokenUser}`);

      expect(response.status).toBe(404);
    });
  });
});
