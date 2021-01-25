const AsyncMysqlDatabase = require("./AsyncMysqlDatabase");

async function seedTestData() {
  const env = process.env.NODE_ENV || "development";
  let config = require(__dirname + "/../config/config.json")[env];

  if (config.use_env_variable) {
    // jaws scenario
    config = process.env[config.use_env_variable];
  } else {
    // local dev scenario
    config = {
      host: "localhost",
      port: 3306,
      database: config.database,
      user: config.username,
      password: process.env.MYSQLROOTPASSWORD
    };
  }

  const db = new AsyncMysqlDatabase(config);

  await db.seedFrom("db/schema.sql");
  await db.seedFrom("db/seeds.sql");
  await db.close();
}

module.exports = seedTestData;
