const Like = require('../models/Like')

const getLikes = async (post_id) => {
  return Like.getLikesByPostId(post_id)
}

const likesControl = async (post_id, user_id) => {
  const check = await Like.checkLike(post_id, user_id)
  let likeData
  if (check) {
    likeData = (await Like.deleteLike(post_id, user_id))[0]
    return { data: likeData, method: 'delete' }
  } else {
    likeData = (await Like.createLike(post_id, user_id))[0]
    const fullData = await Like.getLikeData(likeData.post_id, likeData.user_id)
    return { data: fullData, method: 'post' }
  }
}

module.exports = { getLikes, likesControl }
