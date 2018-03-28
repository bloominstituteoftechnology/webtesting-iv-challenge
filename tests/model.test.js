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
});
