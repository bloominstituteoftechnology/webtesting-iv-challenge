const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Team = require('./models');

describe('Teams', () => {
  describe('getTeamName', () => {
    it('should return the expected team name', () => {
      const team = new Team({
        name: 'Giants',
        sport: 'Football',
      });
      expect(team.getTeamName()).to.equal('Giants');
    });
  });

  describe('getAllTeams', () => {
    it('should return all the teams', () => {
      sinon.stub(Team, 'find');
      Team.find.yields(null, [
        { name: 'Giants', sport: 'Football' },
        { name: 'Lions', sport: 'Football' },
        { name: 'Red Bulls', sport: 'Soccer' },
      ]);
      Team.getAllTeams(teams => {
        expect(teams.length).to.equal(3);
        expect(teams[0].name).to.equal('Giants');
        Team.find.restore();
      });
    });
  });
});
