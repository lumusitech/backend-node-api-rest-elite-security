require("colors");

const logger = (msg = "", type = "") => {
  switch (type) {
    case "info":
      return console.log(msg.white.bgCyan);
    case "success":
      return console.log(msg.white.bgGreen);
    case "error":
      return console.log(msg.white.bgRed);

    default:
      return msg;
  }
};

module.exports = logger;
