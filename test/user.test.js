const UserData = require("../user/user.data.js");
const { getUsers } = require("../user/user.controller.js");

jest.mock("../user/user.data.js", () => ({
  getUsers: jest.fn(),
}));

describe("Test de controlador de Usuarios", () => {
  const mockRequest = (data) => data;
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  UserData.getUsers.mockResolvedValue([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
    },
  ]);

  it("it should get all users", async () => {
    const req = mockRequest();
    const res = mockResponse();
    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      code: "SUCCESS",
      message: "get was succesful",
      body: [
        {
          id: 1,
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
        },
        {
          id: 2,
          firstname: "Jane",
          lastname: "Smith",
          email: "jane.smith@example.com",
        },
      ],
    });
  });
});
