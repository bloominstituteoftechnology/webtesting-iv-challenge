const mongoose = require('mongoose');

const Client = require('./clientModel');
mongoose.models = {};
mongoose.modelSchemas = {};


const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true,
    default:0
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
}]
});

ArtistSchema.methods.changeName = function (newName) {
  return this.name = newName;
};
ArtistSchema.methods.info = function() {
  return {
    name: this.name,
    age: this.age,
    specialty: this.specialty
  }
};

ArtistSchema.methods.addToRank = function (pts) {
  this.rank += pts;
  return `added ${pts} to rank, rank is now ${this.rank}`;
};

ArtistSchema.methods.addClient = function (clientInfo, cb) {
  const client = new Client(clientInfo);
  client.save(() => {});
    this.clients.push(client.id);
    this.save(() => {
      return cb(this);
    });
};

ArtistSchema.statics.findArtist = (artistName, cb) => {
  Artist.findOne({ name: artistName }, (err, artist) => {
    return cb(artist);
  });
};

ArtistSchema.statics.findAll = (cb) => {
  Artist.find({}, (err, artists) => {
    return cb(artists);
  });
};



const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
