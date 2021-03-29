import { Box, Typography } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import config from '../../../../Config.json'
import useStyles from './UserInfoStyles'
import userDataType from '../../../UserPage/PropTypes/userDataType'

function UserInfo({ userData }) {
  const match = useRouteMatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const { first_name, last_name, path } = userData || {
    first_name: '',
    last_name: '',
    path: '',
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    localStorage.removeItem('accessToken')
  }

  return (
    <div>
      <Box
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.user_info}
      >
        <Avatar
          alt=""
          src={`http://${config.SERVER_HOST}:${
            config.SERVER_PORT
          }/${path?.replace(/\\/g, '/')}`}
          className={classes.large}
        />
        <Typography>{first_name + ' ' + last_name}</Typography>
      </Box>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '15ch',
          },
        }}
        elevation={0}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          className={classes.menu_item}
          to={`${match.url}/profile`}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          component={Link}
          to={`/`}
          className={classes.menu_item}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

UserInfo.propTypes = {
  userData: userDataType,
}

export default UserInfo
