const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnimeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
    default: 'Uncategorized',
  },
});

AnimeSchema.methods.getName = function() {
  return this.name;
};

AnimeSchema.statics.getAllAnimes = async function() {
  try {
    const animes = await Anime.find({});
    return animes;
  } catch(err) {
    return err;
  }
};

const Anime = mongoose.model('Anime', AnimeSchema);

module.exports = Anime;