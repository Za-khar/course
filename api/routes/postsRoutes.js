const express = require('express')
const {
  checkAuthorized,
  checkAccess,
  chackActivation,
} = require('../middleware/acl')
const validator = require('../middleware/validator')
const router = express.Router()
const postsController = require('../controllers/postsController')
const { filesStorage } = require('../middleware/multerValidation')
const multer = require('multer')

const upload = multer({
  storage: filesStorage,
  limits: { fileSize: 10000000 },
})

const tableName = 'Posts'
const column = 'user_id'
const columnIDName = 'post_id'

router.get('/', [checkAuthorized, chackActivation], postsController.getPosts)
router.get(
  '/:id',
  [checkAuthorized, chackActivation],
  postsController.getOnePost
)
router.post(
  '/',
  [
    checkAuthorized,
    chackActivation,
    upload.array('files', 4),
    validator({
      title: ['required', 'min:1', 'max:30'],
      content: ['required', 'min:1', 'max:255'],
      access: ['oneOf:me:friends:all'],
    }),
  ],
  postsController.createPost
)
router.put(
  '/:id',
  [
    checkAuthorized,
    chackActivation,
    upload.none(),
    checkAccess([
      { permission: 'updateAnyPost' },
      {
        permission: 'updateOwnPost',
        own: { table: tableName, column: column, columnIDName: columnIDName },
      },
    ]),
    validator({
      title: ['required', 'min:1', 'max:30'],
      content: ['required', 'min:1', 'max:255'],
      access: ['oneOf:me:friends:all'],
    }),
  ],
  postsController.updatePost
)
router.delete(
  '/:id',
  [
    checkAuthorized,
    chackActivation,
    checkAccess([
      { permission: 'deleteAnyPost' },
      {
        permission: 'deleteOwnPost',
        own: { table: tableName, column: column, columnIDName: columnIDName },
      },
    ]),
  ],
  postsController.deletePost
)

module.exports = router
