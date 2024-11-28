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

  ProjectData.createProject.mockResolvedValue({ insertId: 1 });
  ProjectData.assignProject.mockResolvedValue({ insertId: 1 });

  it("it should create a project", async () => {
    const decodedToken = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    };

    const newProject = {
      name: "New Project",
      description: "New Project Description",
      code: "NP123",
      startAt: "2024-01-01",
      endAt: "2024-12-31",
    };

    const req = mockRequest({ user: decodedToken, body: newProject });
    const res = mockResponse();
    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("it should assign a project", async () => {
    const decodedToken = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    };

    const assignData = {
      userId: 1,
      projectId: 1,
      isOwner: 1,
      enabled: 1,
    };

    const req = mockRequest({ user: decodedToken, body: assignData });
    const res = mockResponse();
    await assignProject(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
