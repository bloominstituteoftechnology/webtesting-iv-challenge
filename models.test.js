const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Car = require('./models');

describe('Cars', () => {
  describe('getCarName', () => {
    it('should return the expected car model name', () => {
      const car = new Car({
        manufacturer: 'Chevrolet',
        name: 'Corvette'
      });
      expect(car.getCarName()).to.equal('Corvette');
    });
  });
  describe('getAllCars', () => {
    it('should return all the cars', () => {
      sinon.stub(Car,'find');
      Car.find.yields(null, [
        { manufacturer: 'Porsche', name: '911' },
        { manufacturer: 'Ford', name: 'Mustang' }
      ]);
      Car.getAllCars((cars) => {
        expect(cars.length).to.equal(2);
        expect(cars[1].manufacturer).to.equal('Ford');
        Car.find.restore();
      });
    });
  });
});