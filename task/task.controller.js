const TaskStore = require("./task.store.js");

const getProjectTasks = async (req, res) => {
  const { id } = req.user;
  const { projectId } = req.params;

  const resp = await TaskStore.getProjectTasks(id, projectId);
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

module.exports = {
  getProjectTasks,
};
