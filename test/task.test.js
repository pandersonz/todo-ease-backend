const TaskData = require("../task/task.data.js");
const { getProjectTasks, createTask } = require("../task/task.controller.js");
jest.mock("../task/task.data.js", () => ({
  getProjectTasks: jest.fn(),
  createTask: jest.fn(),
  getCountProjectTasks: jest.fn(),
}));

describe("Tasks controller test", () => {
  const mockRequest = (data) => data;
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  TaskData.getProjectTasks.mockResolvedValue([
    {
      id: 1,
      name: "Project Task 1",
      description: "Description of Project Task 1",
    },
  ]);

  it("it should get tasks per project", async () => {
    const decodedToken = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    };

    const req = mockRequest({ user: decodedToken, params: { projectId: 1 } });
    const res = mockResponse();
    await getProjectTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      code: "SUCCESS",
      message: "get was succesful",
      body: [
        {
          id: 1,
          name: "Project Task 1",
          description: "Description of Project Task 1",
        },
      ],
    });
  });

  TaskData.createTask.mockResolvedValue({ insertId: 1 });
  TaskData.getCountProjectTasks.mockResolvedValue({
    taskCount: 1,
    codeProject: "Test",
  });

  it("it should create a task", async () => {
    const newTask = {
      name: "New Task",
      description: "New Task Description",
      projectId: 1,
    };

    const decodedToken = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    };

    const req = mockRequest({ body: newTask, user: decodedToken });
    const res = mockResponse();
    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
