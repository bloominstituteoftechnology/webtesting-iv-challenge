const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

TeamSchema.methods.getTeamName = function() {
  return this.name;
};

TeamSchema.statics.getAllTeams = function(cb) {
  this.find({}, (err, foods) => {
    if (err) return cb(err);
    return cb(foods);
  });
};
module.exports = mongoose.model('Team', TeamSchema);
