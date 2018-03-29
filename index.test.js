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


  // before((done) => {
  //   mongoose.connect('mongodb://localhost/test');
  //   done();
  // });

  // beforeEach((done) => {
  //   new Painter({
  //     name: 'Jackson Pollack',
  //     style: 'Abstract-Expressionism'
  //   }).save((err, sg) => {
  //     if (err) {
  //       console.log(err);
  //       done();
  //     }
  //     // animeId = savedAnime.id;
  //     done();
  //   });
  // });

  // afterEach((done) => {
  //   Painter.remove({}, (err) => {
  //     if (err) {
  //       console.log(err);
  //     };
  //     done();
  //   });
  // });

  // after((done) => {
  //   // mongoose.connection.db.dropDatabase(() => {
  //     mongoose.connection.close(done);
  //   // });
  //   // done();
  // });

  let id = '';
  describe('[POST] /painter', () => {
    it('should add a new painter', () => {
      const newPainter = {
        name: 'van Gogh',
        style: 'Post-Impressionism'
      };
      chai.request(server)
      .post('/painter')
      .send(newPainter)
      .then(res => {
        console.log('its the post req', res.body);
        // id = res.body._id;
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('van Gogh');
      })
      .catch(err => {
        console.log('broken');
      });
      // .end((err, res) => {
      //   console.log('help me');
      //   console.log("first log", res.body);
      //   if (err) {
      //     console.error(err);
      //     // done();
      //   };
        // id = res.body._id;
        // expect(res.status).to.equal(200);
        // expect(res.body.name).to.equal('van Gogh');
      //   // done();
      // });
      console.log('uh');
    });
  });

  describe('[GET] /allPainters', () => {
    it("should return all the painters", () => {
      chai.request(server)
      .get("/allPainters")
      .end((err, res) => {
        // console.log("log", res.body);
        if (err) {
          console.error(err);
          // done();
        }
        expect(res.status).to.equal(200);
        expect(res.body[0].name).to.equal("van Gogh");
        // done();
      });
    });
  });

  describe('[PUT] /painter', () => {
    it('should update the name property', () => {
      let update = {
        name: 'Vincent van Gogh',
        style: 'Post-Impressionism'
      };
      console.log('id:', id);
      chai.request(server)
      .put(`/painter/:${id}`)
      .send({
        name: 'Vincent van Gogh',
        style: 'Post-Impressionism'
      })
      .then(res => {
        console.log('sorta working');
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal("Vincent van Gogh");
      })
      .catch(err => {
        console.log('it broke', err);
      });
      // .end((err, res) => {
      //   if (err) {
      //     console.error(err);
      //   }
        // expect(res.status).to.equal(201);
        // expect(res.body.name).to.equal("Vincent van Gogh");
      // });
    });
  });

  // describe('[DELETE] /painter', () => {
  //   it('should delete the painter', () => {
  //     chai.request(server)
  //     .delete(`/painter/:${id}`)
  //     .end((err, res) => {
  //       if (err) console.error(err);

  //       sinon.stub(Painter, "find");

  //       Painter.find.yields([]);
  //       Painter.getAllPainters(painters => {
  //           console.log('test');
  //           expect(painters.length).to.equal(0);
  //       });
  //     });
  //   });
  // });
});