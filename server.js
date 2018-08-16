const express = require('express');

const server = express();
server.use(express.json());

let smurfs = [
    {
        id: 0,
        name: 'Brainey Smurf',
        age: 150,
        height: '8cm'
    }
];

server.get('/smurfs', (req ,res) => {
    res.json(smurfs);
});

let smurfId = 1;

server.post('/smurfs', (req, res) => {
    const { name, age, height } = req.body;
    const newSmurf = { name, age, height, id: smurfId };

    if(!name || !age || !height) {
        res.status(400).json('need Name/Age/Height')
    }
    const findSmurfByName = smurf => {
        return smurf.name === name;
    };
    if(smurfs.find(findSmurfByName)) {
        res.status(400).json(`${name} already exist`)
    }

    smurfs.push(newSmurf);
    smurfId++;
    res.json(smurfs);
});

server.put('/smurfs/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, height } = req.body;
    const findSmurfById = smurf => {
        return smurf.id == id;
    };
    const foundSmurf = smurfs.find(findSmurfById);
    if (!foundSmurf) {
        return res.status(400).json('Id not found');
    } else {
        if (name) foundSmurf.name = name;
        if (age) foundSmurf.age = age;
        if (height) foundSmurf.height = height;
        res.json(smurfs);
    }
});

server.delete('/smurfs/:id', (req, res) => {
    const { id } = req.params;
    const foundSmurf = smurfs.find(smurf => smurf.id == id);

    if(foundSmurf) {
        const SmurfRemoved = { ...foundSmurf };
        smurfs = smurfs.filter(smurf => smurf.id != id);
        res.status(200).json(smurfs);
    } else {
        res.status(400).json('no smurf by that ID exist.');
    }
});