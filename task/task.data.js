const { runQuery } = require("../bd/utils.js");

class TaskData {
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
}

module.exports = TaskData;
