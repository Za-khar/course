const config = require('../Config');
const fs = require('fs');
const db = require('../services/db');

const { filesStorage } = require('../middleware/multerValidation');
const multer = require('multer');

const upload = multer({
    storage: filesStorage,
    limits: { fileSize: 104857600 },
}).single('avatar');

class FileController {
    static fileTableName = 'Avatars';

    async uploadAvatar(req, res) {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: `Upload error` });
            } else if (err) {
                return res.status(500).json({ message: `Server error` });
            }
            try {
                const avatar = await db(FileController.fileTableName).select('*').where('user_id', req.user.user_id).first();
                let newAvatar = null;

                if (avatar) {
                    fs.unlinkSync(`${config.get('FILE_PATH')}\\${avatar.path}`);
                    const { filename, size, path } = req.file;
                    newAvatar = (await db(FileController.fileTableName).update({ name: filename, size: size, path: path }).where({ user_id: req.user.user_id }).returning('*'))[0];
                } else {
                    const { filename, size, path } = req.file;
                    newAvatar = (await db(FileController.fileTableName).insert({ name: filename, size: size, path: path, user_id: req.user.user_id }).returning('*'))[0];
                }
                return res.json({ data: newAvatar });
            } catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Upload error' });
            }
        });
    }

    async getAvatar(req, res) {
        try {
            const avatar = await db(FileController.fileTableName).select('*').where('user_id', req.user.user_id).first();
            res.json({ data: avatar });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Search error' });
        }
    }

    async deleteAvatar(req, res) {
        try {
            const avatar = (await db(FileController.fileTableName).where('user_id', req.user.user_id).del('path'))[0];
            fs.unlinkSync(`${config.get('FILE_PATH')}\\${avatar}`);
            res.json({ message: 'Avatar successfully deleted' });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Deletion error' });
        }
    }
}

module.exports = new FileController();