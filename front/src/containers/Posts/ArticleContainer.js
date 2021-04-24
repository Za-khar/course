import React, { useCallback, useEffect, useState } from 'react'

import Article from '../../components/Article/Article'
import PropTypes from 'prop-types'
import { objectPost } from '../../components/Article/PropTypes/postType'
import useApi from '../../hooks/useApi'
import useAuth from '../../hooks/useAuth'

function ArticleContainer({ postData, deletePost }) {
  const [editCommentData, setEditCommentData] = useState(null)
  const [parentCommentData, setParentCommentData] = useState(null)
  const [likes, setLikes] = useState([])
  const { user, accessToken } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [comments, setComments] = useState([])
  const [ws, setWS] = useState(null)
  const [likeWS, setLikeWS] = useState(null)
  const { callApi } = useApi()

  const { post_id } = postData

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await callApi({ url: `/likes/${post_id}` })
    setLikes(res.data)
  }, [post_id, accessToken])

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000/likes/${post_id}`)
    socket.onmessage = function (event) {
      const reqData = JSON.parse(event.data)
      switch (reqData.method) {
        case 'post':
          setLikes((likes) => [...likes, reqData.data])
          break
        case 'delete':
          setLikes((likes) => {
            return likes.filter(
              (data) =>
                !(
                  data.user_id === reqData.data.user_id &&
                  data.post_id === reqData.data.post_id
                )
            )
          })
          break
        default:
      }
    }
    setLikeWS(socket)

    return () => {
      socket.close()
    }
  }, [post_id])

  useEffect(() => {
    return () => ws && ws.close()
  }, [ws])

  const handleLike = useCallback(
    async (e) => {
      e.preventDefault()
      likeWS.send(
        JSON.stringify({
          data: {
            post_id: post_id,
          },
          token: accessToken,
        })
      )
    },
    [likeWS, accessToken, post_id]
  )

  const handleExpandClick = useCallback(async () => {
    if (!expanded) {
      const res = await callApi({ url: `/comments/${post_id}` })
      setComments(res.data)

      const websocket = new WebSocket(`ws://localhost:3000/comments/${post_id}`)

      websocket.onmessage = function (event) {
        const reqData = JSON.parse(event.data)
        switch (reqData.method) {
          case 'post':
            setComments((com) => [...com, reqData.data])
            break
          case 'delete':
            setComments((com) => {
              return com.filter(
                (data) => data.comment_id !== reqData.data.comment_id
              )
            })
            break
          case 'put':
            setComments((com) => {
              return com.map((data) => {
                if (data.comment_id === reqData.data.comment_id) {
                  const { edit_date, comment_text, ...editComment } = data
                  return {
                    ...editComment,
                    edit_date: reqData.data.edit_date,
                    comment_text: reqData.data.comment_text,
                  }
                }

                return data
              })
            })
            break
          default:
        }
      }

      setWS(websocket)

      websocket.onclose = () => {
        setExpanded(false)
        setWS(null)
      }

      setExpanded(!expanded)
    } else {
      ws.close()
      setWS(null)
      setExpanded(!expanded)
    }
  }, [expanded, ws, callApi, post_id])

  const handleSubmit = useCallback(
    async (data, actions) => {
      if (editCommentData) {
        await ws.send(
          JSON.stringify({
            data: {
              comment_id: editCommentData.comment_id,
              comment_text: data.comment_text,
            },
            method: 'put',
            token: accessToken,
          })
        )
      } else if (parentCommentData) {
        await ws.send(
          JSON.stringify({
            data: {
              post_id,
              user_id: user.user_id,
              comment_text: data.comment_text,
              parent_comment_id: parentCommentData.comment_id,
            },
            method: 'post',
            token: accessToken,
          })
        )
      } else {
        await ws.send(
          JSON.stringify({
            data: {
              post_id,
              user_id: user.user_id,
              comment_text: data.comment_text,
              parent_comment_id: null,
            },
            method: 'post',
            token: accessToken,
          })
        )
      }
      setEditCommentData(null)
      setParentCommentData(null)
      actions.resetForm()
    },
    [ws, accessToken, editCommentData, parentCommentData, post_id, user]
  )

  const deleteComment = useCallback(
    async (data) => {
      await ws.send(
        JSON.stringify({
          data: {
            comment_id: data,
          },
          method: 'delete',
          token: accessToken,
        })
      )
      setEditCommentData(null)
      setParentCommentData(null)
    },
    [ws, accessToken]
  )

  const onSubmitDelete = useCallback(async () => {
    await deletePost({ url: `/posts/${post_id}`, method: 'delete' })
  }, [deletePost, post_id])

  return (
    <Article
      postData={postData}
      deletePost={deletePost}
      setEditCommentData={setEditCommentData}
      onSubmitDelete={onSubmitDelete}
      expanded={expanded}
      editCommentData={editCommentData}
      handleExpandClick={handleExpandClick}
      comments={comments}
      likes={likes}
      handleSubmit={handleSubmit}
      deleteComment={deleteComment}
      handleLike={handleLike}
      setParentCommentData={setParentCommentData}
      parentCommentData={parentCommentData}
    />
  )
}

ArticleContainer.propTypes = {
  postData: objectPost,
  deletePost: PropTypes.func.isRequired,
}

export default ArticleContainer
