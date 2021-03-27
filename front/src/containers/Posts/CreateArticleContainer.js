import React, { useCallback } from 'react'
import {
  createPostRequest,
  getOnePost,
  updatePostRequest,
} from './hooks/articleRequests'
import { useMutation, useQuery } from 'react-query'

import CreateArticle from '../../components/UserContainers/CreateArticle/CreateArticle'
import PropTypes from 'prop-types'

function CreateArticleContainer({ id }) {
  const { data: response, isFetching } = useQuery(
    ['posts', id],
    () => getOnePost({ id }),
    {
      enabled: !!id,
    }
  )

  const postData = response?.data || { title: '', content: '', access: 'all' }

  const { mutate: updatePost } = useMutation(updatePostRequest)
  const { mutate: createPost } = useMutation(createPostRequest)

  const onSubmitCreate = useCallback(
    async (formData) => {
      try {
        await createPost({ formData })
      } catch (e) {
        console.log(e)
      }
    },
    [createPost]
  )

  const onSubmitUpdate = useCallback(
    async (formData) => {
      try {
        await updatePost({ id, formData })
      } catch (e) {
        console.log(e)
      }
    },
    [updatePost, id]
  )

  return (
    <>
      {!id ? (
        <CreateArticle
          postData={postData}
          onSubmit={onSubmitCreate}
          isCreate={true}
        />
      ) : isFetching ? (
        <span>Loadin...</span>
      ) : (
        <CreateArticle
          postData={postData}
          onSubmit={onSubmitUpdate}
          isCreate={false}
        />
      )}
    </>
  )
}

CreateArticleContainer.propTypes = {
  id: PropTypes.string,
}

export default CreateArticleContainer
