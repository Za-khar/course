const db = require('../services/db');
const config = require('../Config');
const User = require('../models/User');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { count, offset } = require('../services/db');
const fileService = require('../services/fileService');

const { filesStorage } = require('../middleware/multerValidation');
const multer = require('multer');

const upload = multer({
    storage: filesStorage,
    limits: { fileSize: 104857600 },
}).array('files', 4);

class PostsController {
    static tableName = 'Posts';
    static fileTableName = 'Images';

    async createPost(req, res) {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Upload error' });
            } else if (err) {
                return res.status(400).json({ message: 'Server error' });
            }
            try {
                const { title, content, access } = req.body;
                const date = new Date();
                const newPost = (await db(PostsController.tableName).insert({ title: title, content: content, user_id: req.user.user_id, creation_date: date, edit_date: date, access: access }).returning('*'))[0];

                const filesData = [];

                if (req.files) {
                    for (let file of req.files) {
                        const { filename, size, path } = file;
                        const fileData = (await db(PostsController.fileTableName).insert({ name: filename, size: size, path: path, user_id: req.user.user_id, post_id: newPost.post_id }).returning('*'))[0];
                        filesData.push(fileData);
                    }
                }

                res.json({ message: 'post successfully created' });
            } catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Creation error' });
            }
        });
    }

    async getPosts(req, res) {
        try {
            const limit = req.query.limit || 3;
            const offset = req.query.offset || 0;

            const [{ count }] = await db.count().from('Posts');
            const posts = await db(PostsController.tableName, 'Likes').select('*').orderBy('creation_date', 'desc').limit(limit).offset(offset);

            for (let post of posts) {
                post.filesData = await db(PostsController.fileTableName).select('name', 'size', 'path').where({ post_id: post.post_id });
            }

            res.json({
                data: posts,
                meta: {
                    total: count,
                }
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Search error' });
        }
    }

    async getOnePost(req, res) {
        try {
            const id = req.params.id;
            const post = await db(PostsController.tableName).select('*').where('post_id', id).first();
            post.filesData = await db(PostsController.fileTableName).select('name', 'size', 'path').where({ post_id: id });
            res.json({
                data: post,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Search error' });
        }
    }

    async updatePost(req, res) {
        try {
            const id = req.params.id;
            const { title, content, access } = req.body;
            const date = new Date();
            const post = await db(PostsController.tableName).where('post_id', id).update({ title: title, content: content, edit_date: date, access: access }).returning('*');
            res.json(post);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Update error' });
        }
    }

    async deletePost(req, res) {
        try {
            const id = req.params.id;

            const filesData = await db(PostsController.fileTableName).where('post_id', id).del(['path']);
            filesData.forEach(data => fs.unlinkSync(`${config.get('FILE_PATH')}\\${data.path}`));

            const post = await db(PostsController.tableName).where('post_id', id).del();

            res.json({ message: 'Post successfully deleted' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Deletion error' });
        }
    }
}

module.exports = new PostsController();