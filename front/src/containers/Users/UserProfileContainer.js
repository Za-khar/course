import React, { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import PropTypes from 'prop-types'
import UserProfile from '../../components/UserContainers/UserProfile/UserProfile'
import useApi from '../../hooks/useApi'
import useAuth from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

function UserProfileContainer({ onSubmitUpdate, uploadAvatar, id }) {
  const history = useHistory()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { callApi } = useApi()

  const current_user = id || user.user_id

  const { data: res, isFetching: isFetchingUser, status } = useQuery(
    ['user', id],
    () => callApi({ url: `/users/${id}` }),
    {
      enabled: Boolean(id),
    }
  )

  if (status === 'error' || id === user.user_id) {
    history.push('/home/profile')
  }

  const { data: resFriends, isFetching: isFetchingFriends } = useQuery(
    ['friends', current_user],
    () => callApi({ url: `/friends/${current_user}` })
  )

  const { data: resInReq, isFetching: isFetchingInReq } = useQuery(
    ['inReq', current_user],
    () => callApi({ url: `/friends/incoming-requests/${current_user}` })
  )

  const { data: resOutReq, isFetching: isFetchingOutReq } = useQuery(
    ['outReq', current_user],
    () => callApi({ url: `/friends/outgoing-requests/${current_user}` })
  )

  const { mutate: sendRequest } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['outReq', current_user])
    },
  })

  const { mutate: cancelRequest } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['outReq', current_user])
    },
  })

  const { mutate: confirmRequest } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friends', current_user])
      queryClient.invalidateQueries(['inReq', current_user])
    },
  })

  const { mutate: deleteFriend } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friends', current_user])
      queryClient.invalidateQueries(['inReq', current_user])
    },
  })

  const { mutate: rejectRequest } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inReq', current_user])
    },
  })

  const handleSendRequest = useCallback(
    async (data) => {
      await sendRequest({
        url: `/friends/send-request`,
        method: 'post',
        data: { user_id: data },
      })
    },
    [sendRequest]
  )

  const handleCancelRequest = useCallback(
    async (data) => {
      await cancelRequest({
        url: `/friends/cancel-request`,
        method: 'delete',
        data: { user_id: data },
      })
    },
    [cancelRequest]
  )

  const handleConfirmRequest = useCallback(
    async (data) => {
      await confirmRequest({
        url: `/friends/confirm-request`,
        method: 'post',
        data: { user_id: data },
      })
    },
    [confirmRequest]
  )

  const handleDeleteFriend = useCallback(
    async (data) => {
      await deleteFriend({
        url: `/friends`,
        method: 'delete',
        data: { user_id: data },
      })
    },
    [deleteFriend]
  )

  const handleRejectRequest = useCallback(
    async (data) => {
      await rejectRequest({
        url: `/friends/reject-request`,
        method: 'delete',
        data: { user_id: data },
      })
    },
    [rejectRequest]
  )

  return id && isFetchingUser ? (
    <span>Loading...</span>
  ) : id && status === 'error' ? (
    <span>User is not found</span>
  ) : (
    <UserProfile
      handleSendRequest={handleSendRequest}
      onSubmitUpdate={onSubmitUpdate}
      uploadAvatar={uploadAvatar}
      resFriends={resFriends}
      isFetchingFriends={isFetchingFriends}
      resInReq={resInReq}
      resOutReq={resOutReq}
      isFetchingInReq={isFetchingInReq}
      isFetchingOutReq={isFetchingOutReq}
      handleCancelRequest={handleCancelRequest}
      handleConfirmRequest={handleConfirmRequest}
      handleDeleteFriend={handleDeleteFriend}
      handleRejectRequest={handleRejectRequest}
      userData={res?.data}
      isOwnPage={!id}
    />
  )
}

UserProfileContainer.propTypes = {
  onSubmitUpdate: PropTypes.func,
  uploadAvatar: PropTypes.func,
  id: PropTypes.string,
}

export default UserProfileContainer
