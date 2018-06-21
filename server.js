const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    api: 'api running'
  })
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

module.exports = app;