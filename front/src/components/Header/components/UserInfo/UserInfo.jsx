import React, { useState } from 'react';
import userNameType from '../../PropTypes/userName';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Typography } from '@material-ui/core';

import { useRouteMatch, Link } from 'react-router-dom';
import useStyles from './UserInfoStyles';

function UserInfo({ username }) {
    const match = useRouteMatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box aria-controls="menu" aria-haspopup="true" onClick={handleClick} className={classes.user_info}>
                <Avatar alt="" src="/static/images/avatar/1.jpg" className={classes.large} />
                <Typography>{username.firstName + ' ' + username.secondName}</Typography>
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
                style={{padding: 50}}
                elevation={0}
                getContentAnchorEl={null}
            >
                <Link to={`${match.url}/profile`} className={classes.menu_item}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to={`/`} className={classes.menu_item}>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

UserInfo.propTypes = {
    username: userNameType,
}

export default UserInfo;