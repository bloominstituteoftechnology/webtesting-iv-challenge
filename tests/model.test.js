const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const Topping = require('../model');

describe('Toppings', () => {
    describe('addATopping', () => {
        it('should return the expected pizza topping name', () => {
            const topping = new Topping({
                name: 'pepperoni',
                category: 'meat',
            });
            console.log(topping);
            expect(topping.addATopping()).to.equal('pepperoni');
        });
    });
    describe('getAllTheToppings', () => {
        it('should return all the toppings', () => {
            sinon.stub(Topping, 'find');
            Topping.find.yields(null, [
                { name: 'anchovies', category: 'yuck' },
                { name: 'pineapple', category: 'yuck' },
            ]);
            Topping.getAllTheToppings((toppings) => {
                expect(toppings.length).to.equal(2);
                expect(toppings[1].name).to.equal('pineapple');
                Topping.find.restore();
            });
        });
    });
});
