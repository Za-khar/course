const db = require('../services/db');

class PostsController {
    async createPost(req, res) {
        const {title, content} = req.body;
        const newPost = await db('posts').insert({title: title, content: content}).returning('*');
        res.json(newPost);
    }

    async getPosts(req, res) {
        const posts = await db('posts').select('*');
        res.json(posts);
    }

    async getOnePost(req, res) {
        const id = req.params.id;
        const post = await db('posts').select('*').where('id', id);
        res.json(post);
    }

    async updatePost(req,res) {
        const id = req.params.id;
        const {title, content} = req.body;
        const post = await db('posts').where('id', id).update({title: title, content: content}).returning('*');
        res.json(post);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        const post = await db('posts').where('id', id).del(['id', 'title']);
        res.json(post);
    }
}

module.exports = new PostsController();