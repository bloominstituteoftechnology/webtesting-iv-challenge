const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const db = require('./db');
const app = express();


app.use(express.json());

db.conntectTo('testingdb')
    .then(() => console.log('\n... API Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

app.get('/', (req, res) => {
    res.status(200).json({api: 'api running'})
});

app.post('/product',  (req, res) => {
    Product.create(req.body)
        .then(product => {
            res.status(200).send({product});
        })
        .catch(err => {
            res.status(500).send(err);
        })

});
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

module.exports = app;