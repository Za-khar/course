const db = require('../services/db');

class PostsController {
    static tableName = 'posts';
    
    async createPost(req, res) {
        const {title, content} = req.body;
        const newPost = await db(PostsController.tableName).insert({title: title, content: content, userID: req.user.id}).returning('*');
        res.json(newPost);
    }

    async getPosts(req, res) {
        const posts = await db(PostsController.tableName).select('*');
        res.json(posts);
    }

    async getOnePost(req, res) {
        const id = req.params.id;
        const post = await db(PostsController.tableName).select('*').where('id', id);
        res.json(post);
    }

    async updatePost(req,res) {
        const id = req.params.id;
        const {title, content} = req.body;
        const post = await db(PostsController.tableName).where('id', id).update({title: title, content: content}).returning('*');
        res.json(post);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        const post = await db(PostsController.tableName).where('id', id).del(['id', 'title']);
        res.json(post);
    }
}

module.exports = new PostsController();