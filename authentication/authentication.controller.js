const AuthenticationStore = require("./authentication.store.js");

const login = async (req, res) => {
  const resp = await AuthenticationStore.login(req.body);
  if (resp) {
    return res.status(200).send({
      code: "SUCCESS",
      message: "login was successful",
      body: resp,
    });
  }
  return res.status(400).send({
    code: "FAILURE",
    message: "ERROR",
  });
};

module.exports = {
  login,
};
