const commentsController = require('../controllers/commentsController')
const likesController = require('../controllers/likesController')

module.exports = (ws, req) => {
  const url = req.url.split('/')
  const id = new Date().getTime()
  switch (url[1]) {
    case 'comments':
      commentsController.WSConnection(ws, url[2], id)
      break
    case 'likes':
      likesController.WSConnection(ws, url[2], id)
      break
    default:
      ws.close()
  }
}
