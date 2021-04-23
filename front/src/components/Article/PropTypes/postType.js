import PropTypes from 'prop-types'

const filesData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
})

export const objectPost = PropTypes.shape({
  post_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.oneOf(['all', 'friends', 'me']).isRequired,
  path: PropTypes.string,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  edit_date: PropTypes.string.isRequired,
  creation_date: PropTypes.string.isRequired,
  comments_number: PropTypes.string.isRequired,
  filesData: PropTypes.arrayOf(filesData),
})

export const objectComment = PropTypes.shape({
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  path: PropTypes.string,
  post_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  comment_id: PropTypes.string.isRequired,
  comment_text: PropTypes.string.isRequired,
  create_date: PropTypes.string.isRequired,
  edit_date: PropTypes.string.isRequired,
  parent_comment_id: PropTypes.string,
})

export const objectLike = PropTypes.shape({
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  path: PropTypes.string,
  post_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  like_id: PropTypes.string,
})
