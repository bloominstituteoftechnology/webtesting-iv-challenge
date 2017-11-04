module.exports = app => {
  app.route('/', (req, res) => {
    res.json({message: 'Hello'});
  });
};
