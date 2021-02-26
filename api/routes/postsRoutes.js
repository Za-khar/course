const express = require('express');
const {checkAuthorized, checkAccess} = require('../middleware/acl');
const router = express.Router();

const postsController = require('../controllers/postsController');

const tableName = 'Posts';
const column = 'user_id';
const columnIDName = 'id';

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getOnePost);
router.post('/', [checkAuthorized], postsController.createPost);
router.put('/:id', [checkAuthorized, checkAccess([{permission: 'updateAnyPost'}, {permission: 'updateOwnPost', own: {table: tableName, column: column, columnIDName: columnIDName}}])], postsController.updatePost);
router.delete('/:id', [checkAuthorized, checkAccess([{permission: 'deleteAnyPost'}, {permission: 'deleteOwnPost', own: {table: tableName, column: column, columnIDName: columnIDName}}])], postsController.deletePost);

module.exports = router;