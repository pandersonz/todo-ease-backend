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
}

module.exports = ProjectStore;
