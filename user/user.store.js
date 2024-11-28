const UserData = require("./user.data.js");

class UserStore {
  static getUsers = async () => {
    try {
      const resp = await UserData.getUsers();
      return resp;
    } catch (e) {
      return false;
    }
  };
}

module.exports = UserStore;
