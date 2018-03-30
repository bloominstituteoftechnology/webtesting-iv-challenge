const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const Painter = require('./painterModels');
chai.use(chaiHttp);
const server = require('./index');

mongoose.connect('mongodb://localhost/testPainters', () => {
  console.log("MongoDB active!...Collection is called 'testPainters'.");
});


describe('Index', () => {
  // before(done => {
  //   mongoose.connect('mongodb://localhost/testPainters');
  //   const dbase = mongoose.connection;
  //   dbase.on('error', () => {
  //     console.error('connection error');
  //     done();
  //   });
  //   dbase.once('open', () => {
  //     done();
  //   });
  // });

  // after(done => {
  //   mongoose.connection.db.dropDatabase(() => {
  //     mongoose.connection.close(done);
  //   });
  // });

  let id = '';

  before((done) => {
    mongoose.connect('mongodb://localhost/testPainters');
    const dbase = mongoose.connection;
    dbase.on('error', () => {
      console.error('connection error');
      done();
    });
    dbase.once('open', () => {
      done();
    });
  });

  beforeEach((done) => {
    new Painter({
      name: 'Jackson Pollack',
      style: 'Abstract-Expressionism'
    }).save((err, sg) => {
      if (err) {
        console.log(err);
        done();
      }
      id = sg._id;
      done();
    });
  });

  afterEach((done) => {
    Painter.remove({}, (err) => {
      if (err) {
        console.log(err);
      };
      done();
    });
  });

  after((done) => {
    // mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    // });
    // done();
  });

  describe('[POST] /painter', () => {
    it('should add a new painter', (done) => {
      const newPainter = {
        name: 'van Gogh',
        style: 'Post-Impressionism'
      };
      chai.request(server)
        .post('/painter')
        .send(newPainter)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          };
          console.log(id);
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal('van Gogh');
          done();
        });
        // .then(res => {
      //   // console.log('its the post req', res.body);
      //   console.log('test');
      //   // id = res.body._id;
      //   expect(res.status).to.equal(201);
      //   expect(res.body).to.equal('');
      // })
      // .catch(err => {
      //   console.log('broken', err);
      // });
    });
  });

  describe('[GET] /allPainters', () => {
    it("should return all the painters", (done) => {
      chai.request(server)
      .get("/allPainters")
      .end((err, res) => {
        // console.log("log", res.body);
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body[0].name).to.equal("Jackson Pollack");
        done();
      });
    });
  });

  describe('[PUT] /painter', () => {
    it('should update the name property', (done) => {
      let update = {
        name: 'Vincent van Gogh',
        style: 'Post-Impressionism'
      };
      // console.log('id:', id);
      console.log('delete id', id);

      chai.request(server)
      .put(`/painter/${id}`)
      .send(update)
      // .then(res => {
      //   console.log('put res body', res.body);
      //   expect(res.status).to.equal(201);
      //   // expect(res.body.name).to.equal("Vincent van Gogh");
      //   done();
      // })
      // .catch(err => {
      //   console.log('it broke', err);
      //   done();
      // });
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal("Vincent van Gogh");
        done();
      });
    });
  });

  describe('[DELETE] /painter', () => {
    it('should delete the painter', (done) => {
      chai.request(server)
      .delete(`/painter/:${id}`)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }

        // sinon.stub(Painter, "find");

        // Painter.find.yields([]);
        // Painter.getAllPainters(painters => {
        //     expect(painters.length).to.equal(0);
        // });
        done();
      });
    });
  });
});