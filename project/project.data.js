const { runQuery } = require("../bd/utils.js");

class ProjectData {
  static getProjects = async (userId) => {
    try {
      const resp = await runQuery(
        "SELECT p.*, up.*, owner.u_id AS owner_id, CONCAT(owner.firstname, ' ', owner.lastname) AS owner_name FROM Project p INNER JOIN UserProject up ON p.id = up.projectId LEFT JOIN (SELECT u.id AS u_id, u.firstname, u.lastname, owner_up.projectId FROM User u INNER JOIN UserProject owner_up ON u.id = owner_up.userId WHERE owner_up.isOwner = 1) AS owner ON owner.projectId = p.id WHERE up.userId = ?;",
        [userId]
      );
      return resp;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProjectData;
