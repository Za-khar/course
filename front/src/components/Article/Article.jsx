import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { objectPost } from "./PropTypes/postType";
import Comment from "./components/Comment";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import useStyles from "./ArticleStyles";
import ChatIcon from "@material-ui/icons/Chat";
import TextField from "@material-ui/core/TextField";

function Article({ postData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const match = useRouteMatch();
  const classes = useStyles();

  const { post_id, content, title, creation_date } = postData;

  const date = new Date(creation_date);

  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
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
              <MenuItem
                component={Link}
                to={`${match.url}/edit-article/${post_id}`}
              >
                Edit
              </MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </>
        }
        title="UserName"
        subheader={date.toDateString() + " " + date.toLocaleTimeString()}
      />
      {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
            /> */}
      <CardContent>
        <Typography component="h4" className={classes.post_title}>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.card_menu}>
        <Box ml={1}>
          <Typography color="textSecondary" variant="body2" component="span">
            {70000008}
          </Typography>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography color="textSecondary" variant="body2" component="span">
            Show comments {67345435}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            <ChatIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
        </CardContent>
        <CardContent>
          <TextField
            multiline
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

Article.propTypes = {
  postData: objectPost,
};

export default Article;
