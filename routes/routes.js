const { createUser } = require("../Users/userRoutes");

module.exports = server => {
  server.route("/api/users").post(createUser);
};
