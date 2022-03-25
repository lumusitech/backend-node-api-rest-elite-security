module.exports = {
  NODE_ENV: process.env.NODE_ENV | "127.0.0.1",
  PORT: process.env.PORT | 5000,
  MONGO_URI: process.env.MONGO_URI | "mongodb://db-mongo:27017/elite-security",
  APP_NAME: "Elite Security App",
  BASE_PATH: "/api/v1",
  USERS_PATH: "users",
  ROLES_PATH: "roles",
};
