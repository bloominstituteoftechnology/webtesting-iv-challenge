const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/test');

const Post = require('./post');

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('Post', () => {
  beforeEach((done) => {
    sinon.stub(Post, 'find');
    done();
  });
  afterEach((done) => {
    Post.find.restore();
    done();
  });
  describe('#getTitle()', () => {
    it('should return the expected title', (done) => {
      const post = new Post({
        title: "Post 1",
        author: "Dylan",
        content: "Content for post 1"
      });
      expect(post.getTitle()).to.equal('Post 1');
      done();
    });
  });
  describe('#getAllTitles()', () => {
    const posts = [{
      title: "Post 1",
    },
    {
      title: "Post 2",
    }];
    it ('should return all titles', (done) => {
      Post.find.yields(null, posts);
      Post.getAllTitles((err, titles) => {
        expect(titles.length).to.equal(2);
        expect(titles[0].title).to.equal('Post 1');
        done();
      });
    });
  });
});