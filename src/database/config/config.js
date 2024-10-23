const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  development: {
    // schema: process.env.DATABASE_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
      underscored: true,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    // schema: process.env.DATABASE_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
      underscored: true,
    },
  },
};
