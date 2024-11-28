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

  static createTask = async (data) => {
    try {
      const project = await TaskData.getCountProjectTasks(data.projectId);
      if (project) {
        const resp = await TaskData.createTask({ ...data, ...project });
        return resp;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  static updateTask = async (data) => {
    try {
      const resp = await TaskData.updateTask(data);
      return resp;
    } catch (e) {
      return false;
    }
  };
}

module.exports = TaskStore;
