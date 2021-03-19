const db = require('../services/db');
const config = require('../Config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { count, off } = require('../services/db');

class PostsController {
    static tableName = 'Posts';

    async createPost(req, res) {
        const { title, content, access } = req.body;
        const date = new Date();
        const newPost = await db(PostsController.tableName).insert({ title: title, content: content, user_id: req.user.user_id, creation_date: date, edit_date: date, access: access }).returning('*');
        res.json(newPost);
    }

    async getPosts(req, res) {
        const limit = req.query.limit || 3;
        const offset = req.query.offset || 0;

        const [{ count }] = await db.count().from('Posts');
        const posts = await db(PostsController.tableName, 'Likes').select('*').orderBy('creation_date', 'desc').limit(limit).offset(offset);
        res.json({
            data: posts,
            meta: {
                total: count,
            }
        });
    }

    async getOnePost(req, res) {
        const id = req.params.id;
        const post = await db(PostsController.tableName).select('*').where('post_id', id).first();
        res.json(post);
    }

    async updatePost(req, res) {
        const id = req.params.id;
        const { title, content, access } = req.body;
        const date = new Date();
        const post = await db(PostsController.tableName).where('post_id', id).update({ title: title, content: content, edit_date: date, access: access }).returning('*');
        res.json(post);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        const post = await db(PostsController.tableName).where('post_id', id).del(['id', 'title']);
        res.json(post);
    }
}

module.exports = new PostsController();