function createPool() {
  try {
    const mysql = require("mysql2");

    const db = mysql.createPool({
      host: "us-cdbr-east-06.cleardb.net",
      user: "bf3a9dd6fdeed5",
      password: "0d4be3cf",
      database: "heroku_26310da32c906f9",
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    });

    const promisePool = db.promise();

    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const db = createPool();

module.exports = {
  connection: async () => db.getConnection(),
  execute: (...params) => db.execute(...params),
};
