const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Team = require('./models');

describe('Teams', () => {
  describe('getTeamName', () => {
    it('should return the expected team name', () => {
      const team = new Team({
        name: 'Manchester United',
        sport: 'Soccer',
      });
      expect(team.getTeamName()).to.equal('Manchester United');
    });
  });

  describe('getAllTeams', () => {
    it('should return all the teams', () => {
      sinon.stub(Team, 'findOne');
      Team.findOne.yields(null, [
        { name: 'Houston Rockets', sport: 'Basketball' },
        { name: 'Philadelphia Eagles', sport: 'Football' }
      ]);
      Team.getAllTeams((teams) => {
        expect(teams.length).to.equal(2);
        expect(teams[1].name).to.equal('Philadelphia Eagles');
      });
    });
  });
});