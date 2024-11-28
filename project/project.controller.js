const ProjectStore = require("./project.store.js");

const getProjects = async (req, res) => {
  const { id } = req.user;
  const resp = await ProjectStore.getProjects(id);
  if (resp) {
    return res.status(200).send({
      code: "SUCCESS",
      message: "get was succesful",
      body: resp,
    });
  }
  return res.status(400).send({
    code: "FAILURE",
    message: "ERROR",
  });
};

const createProject = async (req, res) => {
  const { id } = req.user;
  const resp = await ProjectStore.createProject(req.body, id);
  if (resp) {
    return res.status(200).send({
      code: "SUCCESS",
      message: "create was succesful",
      body: resp,
    });
  }
  return res.status(400).send({
    code: "FAILURE",
    message: "ERROR",
  });
};

const assignProject = async (req, res) => {
  const exist = await ProjectStore.validateAssignProject(req.body);
  if (exist) {
    return res.status(400).send({
      code: "FAILURE",
      message: "User already assigned",
    });
  }
  const resp = await ProjectStore.assignProject(req.body);
  if (resp) {
    return res.status(200).send({
      code: "SUCCESS",
      message: "assing was succesful",
      body: resp,
    });
  }
  return res.status(400).send({
    code: "FAILURE",
    message: "ERROR",
  });
};
module.exports = {
  getProjects,
  createProject,
  assignProject,
};
