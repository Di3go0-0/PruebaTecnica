import testServer from "../utils/testServer.js";
import authRoutes from "../routes/auth.routes.js";


let request;

beforeEach(() => {
  request = testServer(authRoutes);
});

describe("[ routes / auth]", () => {
    it("should return a response with status 201 and a register user successful", async () => {
        // Arrange
        const expectedStatus = 201;
        const rolExpected = 'user';
        const requestBody = {
          name: 'testname',
          email: 'test@test.com',
          password: 'testpassword',  
          // El rol deveria ser 'user' si no ponemso admin
        };
    
        // Act
        const response = await request.post("/register").send(requestBody);
    
        // Assert
        expect(response.status).toEqual(expectedStatus);
        expect(response.body.name).toEqual(requestBody.name);
        expect(response.body.email).toEqual(requestBody.email);
        expect(response.body.rol).toEqual(rolExpected);
      });
      it("should return a response with status 201 and a register admin successful", async () => {
        // Arrange
        const expectedStatus = 201;
        const requestBody = {
          name: 'test2name',
          email: 'test2@test.com',
          password: 'test2password',  
          rol: 'admin', // deveria ser 'user' si no ponemso admin
        };
    
        // Act
        const response = await request.post("/register").send(requestBody);
    
        // Assert
        expect(response.status).toEqual(expectedStatus);
        expect(response.body.name).toEqual(requestBody.name);
        expect(response.body.email).toEqual(requestBody.email);
        expect(response.body.rol).toEqual(requestBody.rol);
      });

  it("should return a response with status 200 and a login successful", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedMessage = "Login successful";
    const requestBody = {
      email: process.env.EMAIL, // replace with a valid email in your database
      password: process.env.PASSWORD, // replace with the corresponding password
    };

    // Act
    const response = await request.post("/login").send(requestBody);

    // Assert
    expect(response.status).toEqual(expectedStatus);
    expect(response.body.message).toEqual(expectedMessage);
  });

  it("should return a response with status 200 and a logout successful", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedMessage = "Logout successful";

    // Act
    const response = await request.post("/logout");

    // Assert
    expect(response.status).toEqual(expectedStatus);
    expect(response.body.message).toEqual(expectedMessage);
  });
});
