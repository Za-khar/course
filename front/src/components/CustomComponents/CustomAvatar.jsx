import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import React from 'react'
import config from '../../Config.json'

function CustomAvatar({ path, styles, name }) {
  const fullPath = path
    ? `http://${config.SERVER_HOST}:${config.SERVER_PORT}/${path.replace(
        /\\/g,
        '/'
      )}`
    : ''
  return (
    <Avatar src={fullPath} className={styles}>
      {path || name[0]}
    </Avatar>
  )
}

CustomAvatar.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
}

CustomAvatar.defaultProps = {
  name: '',
}

export default CustomAvatar
