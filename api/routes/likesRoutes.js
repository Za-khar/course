const express = require('express');
const db = require('../services/db');
const { route } = require('./postsRoutes');
const validator = require('../middleware/validator');
const router = express.Router();

const { checkAuthorized } = require('../middleware/acl');

router.post('/:id', [
    checkAuthorized,
], async (req, res) => {
    const unique = await db.select('*').from('Likes').where('user_id', req.user.user_id).andWhere('post_id', req.params.id).first();

    if(unique) {
        res.status(401);
    }

    res.status(200);
});

module.exports = router;