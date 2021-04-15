import Avatar from '@material-ui/core/Avatar'
import config from '../../Config.json'
import PropTypes from 'prop-types'

function CustomAvatar({ path, styles, name = '' }) {
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

export default CustomAvatar
