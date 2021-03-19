import React, { useState } from "react";
import userNameType from "../../PropTypes/userName";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, Typography } from "@material-ui/core";

import { useRouteMatch, Link } from "react-router-dom";
import useStyles from "./UserInfoStyles";

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

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("accessToken");
  };

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
          src="/static/images/avatar/1.jpg"
          className={classes.large}
        />
        <Typography>
          {username.firstName + " " + username.secondName}
        </Typography>
      </Box>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: "15ch",
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
  );
}

UserInfo.propTypes = {
  username: userNameType,
};

export default UserInfo;
