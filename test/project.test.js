const ProjectData = require("../project/project.data.js");
const { getProjects } = require("../project/project.controller.js");

jest.mock("../project/project.data.js", () => ({
  getProjects: jest.fn(),
}));

describe("Project controller test", () => {
  const mockRequest = (data) => data;
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  ProjectData.getProjects.mockResolvedValue([
    { id: 1, name: "Project 1", description: "Description of Project 1" },
    { id: 2, name: "Project 2", description: "Description of Project 2" },
  ]);

  it("it should get all projects", async () => {
    const decodedToken = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    };

    const req = mockRequest({ user: decodedToken });
    const res = mockResponse();
    await getProjects(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      code: "SUCCESS",
      message: "get was succesful",
      body: [
        { id: 1, name: "Project 1", description: "Description of Project 1" },
        { id: 2, name: "Project 2", description: "Description of Project 2" },
      ],
    });
  });
});
