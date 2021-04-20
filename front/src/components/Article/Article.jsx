import { Link, useRouteMatch } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import ChatIcon from '@material-ui/icons/Chat'
import Collapse from '@material-ui/core/Collapse'
import Comment from './components/Comment'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import config from '../../Config.json'
import { objectPost } from './PropTypes/postType'
import useStyles from './ArticleStyles'
import useAuth from '../../hooks/useAuth'
import CustomAvatar from '../CustomComponents/CustomAvatar'
import PropTypes from 'prop-types'

function Article({ postData, deletePost }) {
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [expanded, setExpanded] = React.useState(false)

  const match = useRouteMatch()
  const classes = useStyles()

  const {
    post_id,
    content,
    title,
    creation_date,
    filesData,
    user_id,
    first_name,
    last_name,
    path,
  } = postData
  const date = new Date(creation_date)
  const open = Boolean(anchorEl)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSubmitDelete = useCallback(async () => {
    try {
      await deletePost({ url: `/posts/${post_id}`, method: 'delete' })
    } catch (e) {
      console.log(e)
    }
  }, [deletePost, post_id])

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <CustomAvatar
            className={classes.avatar}
            name={first_name}
            path={path}
          />
        }
        action={
          user.user_id === user_id && (
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
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                PaperProps={{
                  style: {
                    border: '1px solid #d3d4d5',
                    boxShadow: ' 0 0 10px rgba(0,0,0,0.2)',
                    width: '10ch',
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
                <MenuItem onClick={onSubmitDelete}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
        title={`${first_name} ${last_name}`}
        subheader={date.toDateString() + ' ' + date.toLocaleTimeString()}
      />
      {filesData.map((file, index) => (
        <CardMedia
          className={classes.media}
          image={`http://${config.SERVER_HOST}:${
            config.SERVER_PORT
          }/${file.path.replace(/\\/g, '/')}`}
          key={index}
        />
      ))}

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
          <TextField multiline />
        </CardContent>
      </Collapse>
    </Card>
  )
}

Article.propTypes = {
  postData: objectPost,
  onSubmitDelete: PropTypes.func,
}

export default Article
