const UserStore = require("./user.store.js");

const getUsers = async (req, res) => {
  const resp = await UserStore.getUsers();
  if (resp) {
    return res.status(200).send({
      code: "SUCCESS",
      message: "get was succesful",
      body: resp,
    });
  }
  return res.status(400).send({
    code: "FAILURE",
    message: "ERROR",
  });
};

module.exports = {
  getUsers,
};
