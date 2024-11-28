const jwt = require("jsonwebtoken");
const AuthenticationData = require("./authentication.data.js");
class AuthenticationStore {
  static login = async (data) => {
    try {
      const resp = await AuthenticationData.login(data);
      if (resp.length > 0) {
        let token = jwt.sign(
          {
            id: resp[0].id,
            firstname: resp[0].firstname,
            lastname: resp[0].lastname,
            email: resp[0].email,
          },
          process.env.KEY,
          { expiresIn: "2d" }
        );
        return {
          ...resp[0],
          token,
        };
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}

module.exports = AuthenticationStore;
