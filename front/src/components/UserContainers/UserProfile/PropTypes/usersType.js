import PropTypes from 'prop-types'

export const friendType = PropTypes.shape({
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  path: PropTypes.string,
  friend_id: PropTypes.string.isRequired,
  current_user_id: PropTypes.string.isRequired,
})
