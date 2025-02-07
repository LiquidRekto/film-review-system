require("dotenv").config()

module.exports = {
  "development": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Dung6c@@",
    database: process.env.DB_NAME || "film_review_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql", // mysql as default
  },
  /*
  "test": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "database_name",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql", // mysql as default
  },
  "production": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "database_name",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql", // mysql as default
  }
    */
}
