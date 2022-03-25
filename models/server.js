const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const config = require("../config");
const { setMongoDB } = require("../database/config");
const usersRouter = require("../routes/users.routes");
const logger = require("../helpers/logger");
const rolesRouter = require("../routes/roles.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.basePath = config.BASE_PATH;
    this.usersPath = config.USERS_PATH;
    this.rolesPath = config.ROLES_PATH;
    this.appName = config.APP_NAME;
    this.setDB();
    this.setMiddlewares();
    this.setStatics();
    this.setRoutes();
  }

  setDB() {
    setMongoDB();
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  setStatics() {
    this.app.use(express.static("public"));
  }

  setRoutes() {
    this.app.use(`${this.basePath}/${this.usersPath}`, usersRouter);
    this.app.use(`${this.basePath}/${this.rolesPath}`, rolesRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      logger(`server running on port ${this.port}`, "success");
    });
  }
}

module.exports = Server;
