import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CustomAvatar from '../../../CustomComponents/CustomAvatar'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { friendType } from '../PropTypes/usersType'
import { makeStyles } from '@material-ui/core/styles'
import useAuth from '../../../../hooks/useAuth'
import { useQueryClient } from 'react-query'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

function UserList({
  userDataList,
  title,
  handleSendRequest,
  handleCancelRequest,
  handleConfirmRequest,
  handleRejectRequest,
  handleDeleteFriend,
  isOwnPage,
}) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const classes = useStyles()

  const outReqs = queryClient.getQueryData(['outReq', user.user_id])?.data || []
  const inReqs = queryClient.getQueryData(['inReq', user.user_id])?.data || []
  const friends =
    queryClient.getQueryData(['friends', user.user_id])?.data || []

  return (
    <Card>
      <Typography variant="h6">{title}</Typography>
      <List className={classes.root}>
        {userDataList.map(({ path, first_name, friend_id: id, last_name }) => (
          <Box key={id}>
            <ListItem alignItems="flex-start">
              <Link to={`/home/profile/${id}`}>
                <ListItemAvatar>
                  <CustomAvatar path={path} name={first_name} />
                </ListItemAvatar>
                <ListItemText primary={`${first_name} ${last_name}`} />
              </Link>
              {isOwnPage && (
                <>
                  {!outReqs.find(({ friend_id }) => friend_id === id) &&
                    !inReqs.find(({ friend_id }) => friend_id === id) &&
                    !friends.find(({ friend_id }) => friend_id === id) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendRequest?.bind(null, id)}
                      >
                        Send request
                      </Button>
                    )}
                  {outReqs.find(({ friend_id }) => friend_id === id) &&
                    !inReqs.find(({ friend_id }) => friend_id === id) &&
                    !friends.find(({ friend_id }) => friend_id === id) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCancelRequest?.bind(null, id)}
                      >
                        Cancel request
                      </Button>
                    )}
                  {!outReqs.find(({ friend_id }) => friend_id === id) &&
                    inReqs.find(({ friend_id }) => friend_id === id) &&
                    !friends.find(({ friend_id }) => friend_id === id) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirmRequest?.bind(null, id)}
                      >
                        Confirm request
                      </Button>
                    )}
                  {!outReqs.find(({ friend_id }) => friend_id === id) &&
                    !inReqs.find(({ friend_id }) => friend_id === id) &&
                    friends.find(({ friend_id }) => friend_id === id) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeleteFriend?.bind(null, id)}
                      >
                        Delete friend
                      </Button>
                    )}
                  {!outReqs.find(({ friend_id }) => friend_id === id) &&
                    inReqs.find(({ friend_id }) => friend_id === id) &&
                    !friends.find(({ friend_id }) => friend_id === id) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRejectRequest?.bind(null, id)}
                      >
                        Reject request
                      </Button>
                    )}
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Card>
  )
}

CustomAvatar.propTypes = {
  userDataList: PropTypes.arrayOf(friendType),
  handleSendRequest: PropTypes.func,
  handleCancelRequest: PropTypes.func,
  handleConfirmRequest: PropTypes.func,
  handleRejectRequest: PropTypes.func,
  handleDeleteFriend: PropTypes.func,
  isOwnPage: PropTypes.bool,
}

CustomAvatar.defaultProps = {
  title: '',
}

export default UserList
