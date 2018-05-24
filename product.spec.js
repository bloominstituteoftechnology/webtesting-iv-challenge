const mongoose = require('mongoose');

const Product = require('./models/product');

describe('Product Model', () => {

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

    it('should add a new product', async () => {
        const product = {productName: 'Pump'};

        const saveProduct = await Product.create(product);

        expect(saveProduct.productName).toEqual('Pump');

    });


});