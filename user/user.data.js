const { runQuery } = require("../bd/utils.js");

class UserData {
  static getUsers = async () => {
    try {
      const resp = await runQuery("select id, firstname, lastname from User;");
      return resp;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = UserData;
