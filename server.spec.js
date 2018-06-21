const mongoose = require('mongoose');
const Post = require('./Post');


describe('post model', () => {
    
    it('should have a post body', async () => {
        const post = { title: 'test', body: 'test' }
        const savedPost = await Post.create(post);

        expect(savedPost.body).toEqual('test');
    })
})