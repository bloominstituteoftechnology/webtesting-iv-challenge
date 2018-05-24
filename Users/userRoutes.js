const user = require("./User");

const createUser = (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });

  user.save(err, user => {
    if (err) res.send(err);
    res.json(user);
  });
};

module.exports = { createUser };
