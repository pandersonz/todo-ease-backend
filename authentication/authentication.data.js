const { runQuery } = require("../bd/utils.js");

class AutenticationData {
  static login = async (data) => {
    try {
      const { username, password } = data;
      const resp = await runQuery(
        `SELECT id, email, username, firstname, lastname from User where username=? and password=HEX(AES_ENCRYPT(LOWER(?),SHA2('${process.env.KEY_PASS}',256)))`,
        [username, password, password]
      );
      return resp;
    } catch (err) {
      console.log("login err");
      console.log(err);
    }
  };
}

module.exports = AutenticationData;
