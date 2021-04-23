import React, { useCallback, useState } from 'react'

import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ChatIcon from '@material-ui/icons/Chat'
import Collapse from '@material-ui/core/Collapse'
import CustomAvatar from '../../CustomComponents/CustomAvatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { objectComment } from '../PropTypes/postType'
import useAuth from '../../../hooks/useAuth'
import useStyles from '../ArticleStyles'

function Comment({ data, deleteComment, editComment, replies, replyComment }) {
  const classes = useStyles()
  const [showReplies, setShowReplies] = useState(false)
  const { user } = useAuth()
  const {
    first_name,
    last_name,
    path,
    create_date,
    edit_date,
    comment_text,
    user_id,
    comment_id,
    parent_comment_id,
  } = data
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const editDate = new Date(edit_date)
  const createDate = new Date(create_date)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShowReplies = (e) => {
    e.preventDefault()
    setShowReplies(!showReplies)
  }

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault()
      await deleteComment(comment_id)
      setAnchorEl(null)
    },
    [deleteComment, comment_id]
  )

  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault()
      await editComment(data)
      setAnchorEl(null)
    },
    [editComment, data]
  )

  const handleReply = useCallback(
    async (e) => {
      e.preventDefault()
      await replyComment(data)
      setAnchorEl(null)
    },
    [replyComment, data]
  )

  return (
    <Box mb={2}>
      <CardHeader
        avatar={<CustomAvatar path={path} name={first_name} />}
        action={
          user_id === user.user_id && (
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
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
        title={`${first_name} ${last_name}`}
        subheader={
          (editDate.getTime() === createDate.getTime()
            ? 'Created on'
            : 'Edited') +
          ` ${editDate.toDateString()} ${editDate.toLocaleTimeString()}`
        }
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {comment_text}
        </Typography>
      </CardContent>
      {!parent_comment_id && (
        <CardActions disableSpacing className={classes.card_menu}>
          <CardContent>
            <Typography variant="body1" component="span" onClick={handleReply}>
              reply
            </Typography>
          </CardContent>

          <Box>
            <Typography color="textSecondary" variant="body2" component="span">
              Show comments {replies.length}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: showReplies,
              })}
              onClick={handleShowReplies}
              aria-expanded={showReplies}
              aria-label="show comments"
            >
              <ChatIcon />
            </IconButton>
          </Box>
        </CardActions>
      )}
      <Collapse in={showReplies} timeout="auto" unmountOnExit>
        {Boolean(replies.length) && (
          <CardContent>
            {replies.map((data) => (
              <Comment
                key={data.comment_id}
                data={data}
                deleteComment={deleteComment}
                editComment={editComment}
              />
            ))}
          </CardContent>
        )}
      </Collapse>
    </Box>
  )
}

Comment.propTypes = {
  data: objectComment,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func,
  replies: PropTypes.arrayOf(objectComment),
}

Comment.defaultProps = {
  replies: [],
}

export default Comment
