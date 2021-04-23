import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import { Link, useRouteMatch } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import { objectComment, objectLike, objectPost } from './PropTypes/postType'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import ChatIcon from '@material-ui/icons/Chat'
import Collapse from '@material-ui/core/Collapse'
import Comment from './components/Comment'
import CustomAvatar from '../CustomComponents/CustomAvatar'
import CustomPopover from '../CustomComponents/CustomPopover'
import CustomTextField from '../CustomComponents/CustomTextField'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import config from '../../Config.json'
import useAuth from '../../hooks/useAuth'
import useStyles from './ArticleStyles'

function Article({
  postData,
  setEditCommentData,
  onSubmitDelete,
  expanded,
  editCommentData,
  handleExpandClick,
  comments,
  handleSubmit,
  deleteComment,
  likes,
  handleLike,
  setParentCommentData,
  parentCommentData,
}) {
  const { user } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [popover, setPopover] = useState(null)
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
    comments_number,
  } = postData

  const date = new Date(creation_date)
  const open = Boolean(anchorEl)

  const editComment = useCallback(
    async (data) => {
      setParentCommentData(null)
      setEditCommentData(data)
    },
    [setEditCommentData, setParentCommentData]
  )

  const replyComment = useCallback(
    async (data) => {
      setEditCommentData(null)
      setParentCommentData(data)
    },
    [setParentCommentData, setEditCommentData]
  )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCancel = (resetForm) => {
    setParentCommentData(null)
    setEditCommentData(null)
    resetForm()
  }

  const handlePopoverOpen = (event) => {
    setPopover(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopover(null)
  }

  const openPopover = Boolean(popover)

  const commentSchema = Yup.object().shape({
    comment_text: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Impossible to send an empty message'),
  })

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
        <Box
          ml={1}
          aria-owns={openPopover ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Typography color="textSecondary" variant="body2" component="span">
            {likes.length}
          </Typography>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {likes.find(({ user_id }) => user_id === user.user_id) ? (
              <FavoriteIcon style={{ color: 'red' }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
        </Box>
        {Boolean(likes.length) && (
          <CustomPopover
            open={openPopover}
            handlePopoverClose={handlePopoverClose}
            anchorEl={popover}
            likes={likes}
          />
        )}
        <Box>
          <Typography color="textSecondary" variant="body2" component="span">
            Show comments{' '}
            {comments.filter((data) => !data.parent_comment_id).length ||
              comments_number}
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
          {comments
            .filter((comData) => !comData.parent_comment_id)
            .map((data) => (
              <Comment
                key={data.comment_id}
                data={data}
                deleteComment={deleteComment}
                editComment={editComment}
                replyComment={replyComment}
                replies={comments.filter(
                  (reply) => reply.parent_comment_id === data.comment_id
                )}
              />
            ))}
        </CardContent>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{
              comment_text: editCommentData?.comment_text || '',
            }}
            validationSchema={commentSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange, resetForm }) => (
              <Form>
                <CustomTextField
                  id="comment_text"
                  onChange={handleChange}
                  name="comment_text"
                  value={values.comment_text}
                  label={
                    editCommentData
                      ? `Edit comment: ${editCommentData.comment_text}`
                      : parentCommentData
                      ? `Reply to comment: ${parentCommentData.comment_text}`
                      : 'Add comment...'
                  }
                  helperText={
                    errors.comment_text &&
                    touched.comment_text &&
                    errors.comment_text
                  }
                  error={touched.comment_text && Boolean(errors.comment_text)}
                />
                <Button type="submit" variant="contained" color="primary">
                  {editCommentData
                    ? 'Edit'
                    : parentCommentData
                    ? 'Reply'
                    : 'Send'}
                </Button>
                {(editCommentData || parentCommentData) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel.bind(null, resetForm)}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Collapse>
    </Card>
  )
}

Article.propTypes = {
  postData: objectPost,
  setEditCommentData: PropTypes.func.isRequired,
  onSubmitDelete: PropTypes.func.isRequired,
  handleExpandClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  setParentCommentData: PropTypes.func.isRequired,
  parentCommentData: objectComment,
  likes: PropTypes.arrayOf(objectLike),
  comments: PropTypes.arrayOf(objectComment),
  expanded: PropTypes.bool.isRequired,
  editCommentData: objectComment,
}

export default Article
