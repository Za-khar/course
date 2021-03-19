const express = require('express');
const { checkAuthorized, checkAccess } = require('../middleware/acl');
const validator = require('../middleware/validator');
const router = express.Router();

const postsController = require('../controllers/postsController');

const tableName = 'Posts';
const column = 'user_id';
const columnIDName = 'post_id';

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getOnePost);
router.post('/',
    [
        checkAuthorized,
        validator({
            title: ['required', 'min:1', 'max:30'],
            content: ['required', 'min:1', 'max:255'],
            access: ['oneOf:me:friends:all']
        })
    ],
    postsController.createPost
);
router.put('/:id',
    [
        checkAuthorized,
        checkAccess([{ permission: 'updateAnyPost' }, { permission: 'updateOwnPost', own: { table: tableName, column: column, columnIDName: columnIDName } }]),
        validator({
            title: ['required', 'min:1', 'max:30'],
            content: ['required', 'min:1', 'max:255'],
            access: ['oneOf:me:friends:all']
        })
    ],
    postsController.updatePost
);
router.delete('/:id',
    [
        checkAuthorized, checkAccess([{ permission: 'deleteAnyPost' }, { permission: 'deleteOwnPost', own: { table: tableName, column: column, columnIDName: columnIDName } }])
    ],
    postsController.deletePost
);

module.exports = router;