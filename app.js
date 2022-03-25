const config = require("./config");
const logger = require("./helpers/logger");
const Server = require("./models/server");

const server = new Server();

logger(`===============${config.APP_NAME}================`, "info");
server.start();
