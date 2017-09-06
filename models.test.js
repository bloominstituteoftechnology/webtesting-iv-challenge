const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-db', { useMongoClient: true});
const Team = require('./TeamModel');

const chai = require('chai');
const sinon = require('sinon');

const assert = chai.assert;

describe('Team', () => {
  describe('#getTeamName()', () => {
    it.skip('should return the name of the team', () => {
      const team = new Team({ name: 'Oakland Raiders' });
      assert.equal(team.getTeamName(), 'Oakland Raiders')
    });
    it.skip('should return a string', () => {
      const team = new Team({ name: 'Houston Rockets' });
      assert.isString(team.getTeamName());
    });
  });
  describe('#getAllTeams()', () => {
    it.skip('should return all the teams in the database', () => {
      sinon.stub(Team , 'find');
      Team.find.yields([{ name: 'LA Lakers'}, { name: 'GS Warriors' }]);
      Team.getAllTeams((teams) => {
        // REVIEW: if one fails execution is stopped, ask TA's
        assert.lengthOf(teams, 2);
        assert.equal(teams[0].name, 'LA Lakers');
        assert.equal(teams[1].name, 'GS Warriors');
        Team.find.restore();
      });
    });
  });
});
