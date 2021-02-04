const express = require('express');
const {checkAuthorized, checkAccess} = require('../middleware/acl');
const router = express.Router();

const postsController = require('../controllers/postsController');

const tableName = 'posts';
const creatorID = 'userID';
const columnIDName = 'id';

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getOnePost);
router.post('/', [checkAuthorized], postsController.createPost);
router.put('/:id', [checkAuthorized, checkAccess(tableName, creatorID, columnIDName)], postsController.updatePost);
router.delete('/:id', [checkAuthorized, checkAccess(tableName, creatorID, columnIDName)], postsController.deletePost);

module.exports = router;