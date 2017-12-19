const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const Item = require('./walmart');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/items', () => {
  beforeEach((done) => {
    Item.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  let itemId;

  beforeEach((done) => {
    new Item({
      name: "Apple iPhone 6S 16GB 4G LTE Prepaid Smartphone",
      salePrice: 189,
      brandName: "Apple",
      color: "White",
      stock: "Not Available"
    }).save((err, savedItem) => {
      if (err) {
        console.log(err);
        return done();
      }
      itemId = savedItem.id;
      done();
    });
  });

  afterEach((done) => {
    Item.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /items', () => {
    it('should get all of the items', (done) => {
      chai.request(server)
        .get('/items')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          done()
        });
    });
  });

  describe('[POST] /items', () => {
    it('should add a new item', (done) => {
      const item = {
        name: "Straight Talk Apple iPhone 5S 16GB 4G LTE Prepaid Smartphone",
        salePrice: 149,
        brandName: "Apple",
        color: "Gray",
        stock: "Available"
      };
      
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal("Straight Talk Apple iPhone 5S 16GB 4G LTE Prepaid Smartphone");
          expect(res.body.salePrice).to.equal(149);
          expect(res.body.brandName).to.equal("Apple");
          expect(res.body.color).to.equal("Gray");
          expect(res.body.stock).to.equal("Available");
          done()
        });
    });
  });

  // describe('[DELETE] /items/:id', () => {
  //   it('should remove the specified item', (done) => {
  //     chai.request(server)
  //       .delete(`/items/${itemId}`)
  //       .end((err, res) => {
  //         if (err) {
  //           console.log(err);
  //           return done();
  //         }
  //         expect(res.success).to.equal(true);
  //         // Food.findById(foodId, (err, deletedFood) => {
  //         //   if (err) {
  //         //     console.log(err);
  //         //     return done();
  //         //   }
  //         //   expect(deletedFood).to.equal(null);
  //         //   done();
  //         // });
  //       });
  //   });
  // });
});