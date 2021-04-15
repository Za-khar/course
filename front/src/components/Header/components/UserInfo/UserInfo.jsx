import { Box, Typography } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useAuth from '../../../../hooks/useAuth'
import { useQueryClient } from 'react-query'
import useStyles from './UserInfoStyles'
import CustomAvatar from '../../../CustomComponents/CustomAvatar'

function UserInfo() {
  const queryClient = useQueryClient()
  const path = queryClient.getQueryData('avatar')?.data?.path
  const { user, logoutMutation } = useAuth()
  const match = useRouteMatch()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    logoutMutation.mutate()
  }

  return (
    <div>
      <Box
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.user_info}
      >
        <CustomAvatar
          path={path}
          styles={classes.large}
          name={user.first_name}
        />
        <Typography>{user?.first_name + ' ' + user?.last_name}</Typography>
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

export default UserInfo
