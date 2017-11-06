const Artist = require('../models/artistModel');

const addArtist = (req, res) => {
  let artist = new Artist(req.body);
  artist.save((err) => {
    return err ? res.status(422).json(err) : res.json(artist);
  });
};

const getArtists = (req, res) => {
  Artist.find({})
  .exec((err, artists) => {
    return err ? res.status(500).json(err) : res.json(artists);
  });
};

const updateArtist = (req, res) => {
  const { id } = req.params;
  const { name, age, specialty } = req.body;
  Artist.findByIdAndUpdate(id, { name, age, specialty })
  .then(() => {
    Artist.findById(id)
    .exec((err, artist) => {
      return err ? res.status(422).json(err) : res.json(artist);
    });
  }); 
};

const addClient = (req, res) => {
  const { id } = req.params;
  Artist.findById(id,(err, artist) => {
    artist.addClient(res.body, (updated) => {
      res.json(updated);
    });
  }); 
};

const removeArtist = (req, res) => {
  const { id } = req.params;
  Artist.findByIdAndRemove(id)
  .exec((err) => {
    return err ? res.status(422).json(err) : Artist.findAll((artists) => res.json({ data: artists, success: true }));
  });
};


module.exports = (app) => {
  app.post('/add-artist', addArtist);
  app.get('/artists/', getArtists);
  app.put('/update-artist/:id', updateArtist);
  app.put('/artist/:id/add-client', addClient);
  app.delete('/remove-artist/:id', removeArtist);
};