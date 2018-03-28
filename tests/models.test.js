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
    });
  });
  describe('getWeaponDescription', () => {
    it('should return the correct weapon description', () => {
      const newWeapon = {
        name: 'Knife',
        description: 'Stabs the flesh',
      };
      const weapon = new Weapon(newWeapon);
      assert.equal(weapon.getWeaponDesc(), 'Stabs the flesh');
    });
  });
  describe('getAllWeapons', () => {
    it('should return all weapons', () => {
      const weaponStub = sinon.stub(Weapon, 'find');
      weaponStub.yields(null, [
        {
          name: 'Knife',
          description: 'Stabs the flesh',
        },
        {
          name: 'Pencil',
          description: 'Pokes the flesh',
        },
      ]);
      Weapon.getAllWeapons(weapons => {
        assert.equal(weapons.length, '2');
        assert.equal(weapons[0].name, 'Knife');
      });
    });
  });
});
