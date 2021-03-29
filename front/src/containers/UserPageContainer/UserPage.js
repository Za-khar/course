import React, { useCallback } from 'react'
import { getOneUser, updateUser, uploadUserAvatar } from './hooks/userRequests'
import { useMutation, useQuery } from 'react-query'

import UserPage from '../../components/UserPage/UserPage'

function UserPageContainer() {
  const { data: response, isFetching } = useQuery('user', getOneUser)

  const { mutate: updateUserData } = useMutation(updateUser)
  const { mutate: uploadAvatar } = useMutation(uploadUserAvatar)

  const onSubmitUpdate = useCallback(
    async (formData) => {
      try {
        await updateUserData({ formData })
      } catch (e) {
        console.log(e)
      }
    },
    [updateUserData]
  )

  const onSubmitUpload = useCallback(
    async (formData) => {
      try {
        await uploadAvatar({ formData })
      } catch (e) {
        console.log(e)
      }
    },
    [uploadAvatar]
  )

  return (
    <UserPage
      userData={response?.data}
      onSubmitUpdate={onSubmitUpdate}
      uploadAvatar={onSubmitUpload}
    />
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
