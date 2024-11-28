const { connection } = require("./connection.js");

const runQuery = async (query, arrayValue) => {
  const newPromise = new Promise(function (resolve, reject) {
    connection.query(query, arrayValue, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
  const resp = await newPromise;
  return resp;
};

module.exports = {
  runQuery,
};
