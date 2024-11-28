require("dotenv").config();
const AuthenticationData = require("../authentication/authentication.data.js");
const { login } = require("../authentication/authentication.controller.js");

jest.mock("../authentication/authentication.data.js", () => ({
  login: jest.fn(),
}));

describe("authentication controller test", () => {
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test("it should respond with 200 if the credentials are correct", async () => {
    const req = mockRequest({
      body: { username: "testuser", password: "123456" },
    });
    const res = mockResponse();

    AuthenticationData.login.mockResolvedValue([
      {
        id: 1,
        firstname: "Test",
        lastname: "User",
        email: "testuser@example.com",
        username: "testuser",
      },
    ]);
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      code: "SUCCESS",
      message: "login was successful",
      body: {
        id: 1,
        firstname: "Test",
        lastname: "User",
        email: "testuser@example.com",
        username: "testuser",
        token: expect.any(String),
      },
    });

    expect(AuthenticationData.login).toHaveBeenCalledWith({
      body: {
        username: "testuser",
        password: "123456",
      },
    });
  });

  test("it should respond with 400 if the credentials are incorrect", async () => {
    const req = mockRequest({
      username: "wronguser",
      password: "wrongpassword",
    });
    const res = mockResponse();

    AuthenticationData.login.mockResolvedValue([]);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: "FAILURE",
      message: "ERROR",
    });
  });

  test("it must handle errors correctly if a database problem occurs", async () => {
    const req = mockRequest({ username: "testuser", password: "123456" });
    const res = mockResponse();

    AuthenticationData.login.mockRejectedValue(new Error("Database error"));

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: "FAILURE",
      message: "ERROR",
    });
  });
});
