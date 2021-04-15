import React, { useCallback, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'

import { Context } from '../../authStore'
import UserPage from '../../components/UserPage/UserPage'
import useApi from '../../hooks/useApi'
import useAuth from '../../hooks/useAuth'
import { useQueryClient } from 'react-query'

function UserPageContainer() {
  const queryClient = useQueryClient()
  const [state, dispatch] = useContext(Context)
  const { callApi } = useApi()

  useQuery('avatar', () => callApi({ url: `/files/avatar` }))

  const { mutate: updateUserData } = useMutation(callApi, {
    onSuccess: (res) => {
      dispatch({
        type: 'SET_AUTH',
        payload: {
          user: res.data,
        },
      })
    },
  })

  const { mutate: uploadAvatar } = useMutation(callApi, {
    onSuccess: () => queryClient.invalidateQueries('avatar'),
  })

  const onSubmitUpdate = useCallback(
    async (formData) => {
      try {
        await updateUserData({ url: `/users`, method: 'put', data: formData })
      } catch (e) {
        console.log(e)
      }
    },
    [updateUserData]
  )

  const onSubmitUpload = useCallback(
    async (formData) => {
      try {
        await uploadAvatar({
          url: `/files/upload-avatar`,
          method: 'post',
          data: formData,
        })
      } catch (e) {
        console.log(e)
      }
    },
    [uploadAvatar]
  )

  return (
    <UserPage onSubmitUpdate={onSubmitUpdate} uploadAvatar={onSubmitUpload} />
  )
}

// const userData = {
//   id: 1,
//   firstName: 'Ivan',
//   lastName: 'Ivanov',
//   age: 25,
//   avatar: {
//     fileId: 1,
//     file: {
//       id: 1,
//       name: 'photo.jpg',
//       path: '/upload/photo.jpg',
//       size: 1234,
//     },
//   },
//   friends: [], //array of users
//   articles: [
//     {
//       title: 'Article 1',
//       text: 'Some text',
//       images: [{}, {}, {}], // array of files
//       createdAt: '2020-12-17 19:00:00',
//       editedAt: '2020-12-17 20:00:00',
//       likes: [
//         { userId: 2, user: { id: 2 }, date: '2020-12-17 21:00:00' },
//         { userId: 3, user: { id: 3 }, date: '2020-12-17 22:00:00' },
//       ],
//     },
//   ],
// }

export default UserPageContainer
