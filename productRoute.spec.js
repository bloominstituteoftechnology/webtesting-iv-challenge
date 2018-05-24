const request = require('supertest');
const server = require('./server');
const mongoose = require('mongoose');

const Product = require('./models/product');
describe('server', () => {

    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/testingdb')
            .then(console.log('conntected to test db'));
    });

    afterEach(() => {
        return Product.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should added new product', async () => {
        const product = {productName: "Car"};

        const response = await request(server).post('/product').send(product);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.product).toMatchObject({productName: product.productName})

    })
});
