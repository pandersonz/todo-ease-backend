const { runQuery } = require("../bd/utils.js");

class TaskData {
  static getTasks = async (userId) => {
    try {
      const resp = await runQuery(
        "SELECT t.*, p.name AS projectName, p.code AS projectCode, CONCAT(reporter.firstname, ' ', reporter.lastname) AS reporterName, CONCAT(assigned.firstname, ' ', assigned.lastname) AS assignedName FROM Task t INNER JOIN Project p ON t.projectId = p.id LEFT JOIN User reporter ON t.reporterUserId = reporter.id LEFT JOIN User assigned ON t.assignedUserId = assigned.id WHERE (t.assignedUserId = ? OR t.reporterUserId = ?);",
        [userId, userId]
      );
      return resp;
    } catch (err) {
      console.log(err);
    }
  };

  static getProjectTasks = async (userId, projectId) => {
    try {
      const resp = await runQuery(
        "SELECT t.*, p.name AS projectName, p.code AS projectCode, CONCAT(reporter.firstname, ' ', reporter.lastname) AS reporterName, CONCAT(assigned.firstname, ' ', assigned.lastname) AS assignedName FROM Task t INNER JOIN Project p ON t.projectId = p.id LEFT JOIN User reporter ON t.reporterUserId = reporter.id LEFT JOIN User assigned ON t.assignedUserId = assigned.id WHERE p.id = ? AND (t.assignedUserId = ? OR t.reporterUserId = ?);",
        [projectId, userId, userId]
      );
      return resp;
    } catch (err) {
      console.log(err);
    }
  };

  static createTask = async (data) => {
    try {
      const resp = await runQuery(
        "insert into Task values (0,?,?,?,?,?,?,?,?,?,?,?,NOW(),null)",
        [
          data.name,
          data.description,
          `${data.projectCode}-${data.taskCount + 1}`,
          data.taskPriorityId,
          data.taskStatusId,
          data.estimate,
          data.startAt,
          data.endAt,
          data.projectId,
          data.reporterUserId,
          data.assignedUserId,
        ]
      );
      return resp;
    } catch (err) {
      console.log(err);
    }
  };

  static getCountProjectTasks = async (projectId) => {
    try {
      const resp = await runQuery(
        "SELECT COALESCE(COUNT(t.id), 0) AS taskCount, p.code AS projectCode FROM Project p LEFT JOIN Task t ON t.projectId = p.id  WHERE p.id = ? GROUP BY p.code;",
        [projectId]
      );
      return resp[0];
    } catch (err) {
      console.log(err);
    }
  };

  static updateTask = async (data) => {
    try {
      const resp = await runQuery(
        "update Task set name=?, description=?, taskPriorityId=?, taskStatusId=?, estimate=?, startAt=?, endAt=?, assignedUserId=?, updatedAt=NOW() where id=?",
        [
          data.name,
          data.description,
          data.taskPriorityId,
          data.taskStatusId,
          data.estimate,
          data.startAt,
          data.endAt,
          data.assignedUserId,
          data.id,
        ]
      );
      return resp;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = TaskData;
