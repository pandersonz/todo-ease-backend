const ProjectData = require("./project.data.js");

class ProjectStore {
  static getProjects = async (userId) => {
    try {
      const resp = await ProjectData.getProjects(userId);
      return resp;
    } catch (e) {
      return false;
    }
  };

  static createProject = async (data, id) => {
    try {
      const resp = await ProjectData.createProject(data);
      if (resp) {
        const assignResp = await ProjectData.assignProject({
          userId: id,
          isOwner: 1,
          enabled: 1,
          projectId: resp.insertId,
        });
        if (!assignResp) {
          return false;
        }
      }
      return resp;
    } catch (e) {
      return false;
    }
  };
}

module.exports = ProjectStore;
