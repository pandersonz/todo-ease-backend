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

module.exports = {
  getProjects,
  createProject,
};
