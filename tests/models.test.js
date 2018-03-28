const mongoose = require('mongoose');
const chai = require('chai');
const { assert } = chai;
const sinon = require('sinon');
const Weapon = require('../models/WeaponsModel');

describe('Weapons', () => {
  describe('getWeaponName', () => {
    it('should return the correct weapon name', () => {
      const newWeapon = {
        name: 'Knife',
        description: 'Stabs the flesh',
      };
      const weapon = new Weapon(newWeapon);
      assert.equal(weapon.getWeaponName(), 'Knife');
      // expect(weapon.getWeaponName()).to.equal('Knife');
    });
  })



})