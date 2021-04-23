import Box from '@material-ui/core/Box'
import CustomAvatar from '../CustomComponents/CustomAvatar'
import Popover from '@material-ui/core/Popover'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { objectLike } from '../Article/PropTypes/postType'

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  users__block: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  username: {
    marginLeft: '10px',
  },
}))

function CustomPopover({ open, handlePopoverClose, anchorEl, likes }) {
  const classes = useStyles()

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      {likes.map(({ path, first_name, last_name, like_id }) => (
        <Box key={like_id} className={classes.users__block}>
          <CustomAvatar path={path} name={first_name} />
          <Typography
            className={classes.username}
          >{`${first_name} ${last_name}`}</Typography>
        </Box>
      ))}
    </Popover>
  )
}

CustomPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  handlePopoverClose: PropTypes.func.isRequired,
  likes: PropTypes.arrayOf(objectLike),
}

export default CustomPopover
