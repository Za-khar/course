const db = require('../services/db')

class File {
  static fileTableName = 'Images'

  async getFileData(post_id) {
    return db(File.fileTableName)
      .select('name', 'size', 'path')
      .where({ post_id: post_id })
  }

  async deleteFile(id) {
    return db(File.fileTableName).where('post_id', id).del(['path'])
  }

  async addFile({ filename, size, path, user_id, post_id }) {
    return db(File.fileTableName)
      .insert({
        name: filename,
        size: size,
        path: path,
        user_id: user_id,
        post_id: post_id,
      })
      .returning('*')
  }
}

module.exports = new File()
