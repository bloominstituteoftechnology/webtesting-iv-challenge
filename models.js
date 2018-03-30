const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  sport: {
    required: true,
    type: String,
  },
});

TeamSchema.methods.getTeamName = function() {
  return this.name;
};

TeamSchema.statics.getAllTeams = cb => {
  Team.find({}, (err, team) => {
    if (err) console.error(err);
    cb(team);
  });
};

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;