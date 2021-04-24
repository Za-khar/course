const { likeService } = require('../services')
const { authMiddlewareWS } = require('../middleware/auth.middleware')

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

class LikesController {
  async getLikes(req, res) {
    try {
      const post_id = req.params.id
      const likes = await likeService.getLikes(post_id)
      res.send(likes)
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Upload likes error!' })
    }
  }

  async WSConnection(ws, url, id) {
    ws.on('message', async (request) => {
      try {
        const reqData = JSON.parse(request)
        const user = await authMiddlewareWS(ws, reqData.token)
        const res = await likeService.likesControl(
          reqData.data.post_id,
          user.user_id
        )
        store.sendData(res)
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
}

module.exports = new LikesController()
