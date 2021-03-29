import PropTypes from 'prop-types'

const userDataType = PropTypes.shape({
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  path: PropTypes.string,
  phone_number: PropTypes.string,
})

export default userDataType
