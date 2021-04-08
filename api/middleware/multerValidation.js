const multer = require('multer')
const config = require('../Config')

const filesStorage = multer.diskStorage({
  destination: function (req, files, cb) {
    const path = `files/${req.user.user_id}`
    if (config.getFileTypes().includes(files.mimetype)) {
      return cb(null, path)
    } else {
      cb({ error: 'Mime type not supported' })
    }
  },
  filename: function (req, files, cb) {
    cb(null, `${files.fieldname}-${Date.now()}.${files.mimetype.split('/')[1]}`)
  },
})

module.exports = {
  filesStorage,
}
