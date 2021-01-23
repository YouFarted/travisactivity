const AsyncMysqlDatabase = require("./AsyncMysqlDatabase");

async function seedTestData() {
  const env = process.env.NODE_ENV || "development";
  const config = require(__dirname + "/../config/config.json")[env];

  if (env === "test") {
    // we drop/recreate a database if it exists and that cannot be done
    // if we're connected into it, otherwise the connection would be trying
    // to remove a database that it is already joined to.
    // So to drop/create, we connect to a database
    // that'll certainly be there and do it from there.
    config.database = "sys";
    config.password = process.env.MYSQLROOTPASSWORD;
  }

  const db = new AsyncMysqlDatabase({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQLROOTPASSWORD,
    database: "sys"
  });

  await db.seedFrom("db/schema.sql");
  await db.seedFrom("db/seeds.sql");
  await db.close()
}

module.exports = seedTestData;
