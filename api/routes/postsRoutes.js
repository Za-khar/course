const express = require('express');
const checkAuthorized = require('../middleware/acl').checkAuthorized;
const router = express.Router();

const postsController = require('../controllers/postsController');

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getOnePost);
router.post('/', checkAuthorized, postsController.createPost);
router.put('/:id', checkAuthorized, postsController.updatePost);
router.delete('/:id', checkAuthorized, postsController.deletePost);

module.exports = router;