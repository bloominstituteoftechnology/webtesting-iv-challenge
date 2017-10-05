const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Post = require('./post');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/posts', () => {
  let _id;
  beforeEach((done) => {
    const post = new Post({
      title: 'Post',
      author: 'Dylan',
      content: 'This is the content'
    });
    post.save((err, p) => {
      if (err) {
        console.log(err);
        done();
      }
      _id = p._id;
      done();
    });
  });
  
  afterEach((done) => {
    Post.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /posts', () => {
    it('should get all of the posts', (done) => {
      chai.request(server)
        .get('/posts')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });
  describe('[POST] /posts', () => {
    it('should return the added post', (done) => {
      const add = {
        title: "Post Added",
        author: "Dylan",
        content: "This is the content I am adding"
      };
      chai.request(server)
        .post('/posts')
        .send(add)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('title', 'Post Added');
          expect(res.body).to.have.property('content', 'This is the content I am adding');
          expect(res.body).to.have.property('author', 'Dylan');
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });
  describe('[PUT] /posts/:id', () => {
    it('should return the updated post', (done) => {
      const update = {
        title: "Post Updated",
        author: "Dyl",
        content: "This is the content thats been updated"
      };
      chai.request(server)
        .put(`/posts/${_id}`)
        .send(update)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('title', 'Post Updated');
          expect(res.body).to.have.property('author', 'Dyl');
          expect(res.body).to.have.property('content', 'This is the content thats been updated');
          expect(res.body).to.have.property('_id', _id.toString());
          done();
        });
    });
  });
  describe('[DELETE] /posts/:id', () => {
    it('should delete the post', (done) => {
      chai.request(server)
        .delete(`/posts/${_id}`)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success', 'Post was removed');
          Post.find({}, (err, posts) => {
            if (err) console.log(err);
            expect(posts.length).to.equal(0);
            done();
          });
        });
    });
  });
});