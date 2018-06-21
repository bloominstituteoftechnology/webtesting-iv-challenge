const mongoose = require('mongoose');
const Post = require('./Post');


describe('post model', () => {
    beforeAll(function() {
        return mongoose.connect('mongodb://localhost/postdb')
    });
    
    // afterEach(() => {
    //     return Post.remove();
    // });

    afterAll(() => {
        return mongoose.disconnect();
    })
    
    it('should have a title', async () => {
        const post = { title: 'firstTest', body: 'firstTest' }
        const savedPost = await Post.create(post);
        expect(savedPost.title).toEqual('firstTest');
    })

    it('should have a post body', async () => {
        const post = { title: 'test', body: 'test' }
        const savedPost = await Post.create(post);
        expect(savedPost.body).toEqual('test');
    })

    it('should delete a post', async () => {
        const deletePost = {title: 'test'};
        const deletedPost = await Post.findOneAndRemove(deletePost);
        expect(deletedPost.title).toEqual(deletePost.title);
    })
})