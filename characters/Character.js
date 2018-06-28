const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const charSchema = new mongoose.Schema({
    charName: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        required: true,
        type: String
    },
    wand:{
        type: String,
    },
    house: {
        required: true,
        type: String,
        validate: {
            validator: /(Gryffindor| Slytherin| Hufflepuff| Ravenclaw)/, 
            msg: "invalid house"
        }
    }
});

// charSchema.pre('save', function (){
//     bcrypt.hash(this.password, 10)
//     .then(hash => {
//         this.password = hash;
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     });
//// })

const charModel = mongoose.model("Char", charSchema, "chars");

module.exports = charModel;