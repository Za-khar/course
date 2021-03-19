import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

function Comment() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mb={2}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <>
            <IconButton
              aria-label="more"
              aria-controls="edit_menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="edit_menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              elevation={0}
              getContentAnchorEl={null}
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
                  border: "1px solid #d3d4d5",
                  boxShadow: " 0 0 10px rgba(0,0,0,0.2)",
                  width: "10ch",
                  maxHeight: 100,
                },
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </>
        }
        title="UserName"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          5555
        </Typography>
      </CardContent>
    </Box>
  );
}

export default Comment;
