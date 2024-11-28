const TaskData = require("./task.data.js");

class TaskStore {
  static getProjectTasks = async (userId, projectId) => {
    try {
      const resp = await TaskData.getProjectTasks(userId, projectId);
      return resp;
    } catch (e) {
      return false;
    }
  };
}

module.exports = TaskStore;
