const { commentService } = require('../services')
const { authMiddlewareWS } = require('../middleware/auth.middleware')
const { checkAccessWS } = require('../middleware/acl')

const store = {
  cbs: {},
  addCB(id, cb) {
    this.cbs[id] = cb
  },
  deleteCb(id) {
    delete this.cbs[id]
  },
  sendData(data) {
    Object.entries(this.cbs).forEach(([id, cb]) => {
      try {
        cb(data)
      } catch (e) {
        this.deleteCb(id)
      }
    })
  },
}

class CommentsController {
  static tableName = 'Post_comments'
  static column = 'user_id'
  static columnIDName = 'comment_id'

  async WSConnection(ws, url, id) {
    ws.on('message', async (request) => {
      try {
        const reqData = JSON.parse(request)
        const user = await authMiddlewareWS(ws, reqData.token)

        let commentData
        let access
        switch (reqData.method) {
          case 'post':
            const parentComment = await commentService.getParentComment(
              reqData.data.parent_comment_id
            )
            if (
              reqData.data.comment_text.length > 0 &&
              reqData.data.comment_text.length <= 50 &&
              !parentComment?.parent_comment_id
            ) {
              commentData = await commentService.createComment(reqData.data)
              store.sendData({ method: 'post', data: commentData })
            } else {
              ws.close()
            }
            break
          case 'delete':
            access = await checkAccessWS(
              [
                { permission: 'deleteAnyPost' },
                {
                  permission: 'deleteOwnPost',
                  own: {
                    table: CommentsController.tableName,
                    column: CommentsController.column,
                    columnIDName: CommentsController.columnIDName,
                  },
                },
              ],
              user,
              reqData.data.comment_id
            )
            if (access) {
              commentData = await commentService.deleteComment(reqData.data)
              store.sendData({
                method: 'delete',
                data: commentData,
              })
            } else {
              ws.close()
            }
            break
          case 'put':
            access = checkAccessWS(
              [
                { permission: 'updateAnyPost' },
                {
                  permission: 'updateOwnPost',
                  own: {
                    table: CommentsController.tableName,
                    column: CommentsController.column,
                    columnIDName: CommentsController.columnIDName,
                  },
                },
              ],
              user,
              reqData.data.comment_id
            )

            if (
              access &&
              reqData.data.comment_text.length > 0 &&
              reqData.data.comment_text.length <= 50
            ) {
              commentData = await commentService.editComment(reqData.data)
              store.sendData({
                method: 'put',
                data: commentData,
              })
            } else {
              ws.close()
            }
            break
          default:
            ws.close()
        }
      } catch (e) {
        ws.close()
      }
    })

    store.addCB(id, (res) => {
      if (url === res.data.post_id) {
        const data = JSON.stringify(res)
        ws.send(data)
      }
    })

    ws.on('close', () => {
      store.deleteCb(id)
    })
  }

  async getComments(req, res) {
    try {
      const post_id = req.params.id
      const comments = await commentService.getComments(post_id)
      res.send(comments)
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Upload comments error!' })
    }
  }
}

module.exports = new CommentsController()
