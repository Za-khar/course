const db = require('../services/db');
const config = require('../Config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class PostsController {
    static tableName = 'Posts';
    
    async createPost(req, res) {
        const {title, content} = req.body;
        const date = new Date();
        const newPost = await db(PostsController.tableName).insert({title: title, content: content, user_id: req.user.id, creation_date: date, edit_date: date}).returning('*');
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