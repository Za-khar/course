import React, { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useApi from '../../hooks/useApi'

import CreateArticle from '../../components/UserContainers/CreateArticle/CreateArticle'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function CreateArticleContainer({ id }) {
  const history = useHistory()
  const queryClient = useQueryClient()
  const { callApi } = useApi()
  const { data: response, isFetching } = useQuery(
    ['post', id],
    () => callApi({ url: `/posts/${id}` }),
    {
      enabled: !!id,
    }
  )

  const postData = response?.data.data || {
    title: '',
    content: '',
    access: 'all',
  }

  const { mutate: updatePost } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      history.push(`/home`)
    },
  })
  const { mutate: createPost } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      history.push(`/home`)
    },
  })

  const onSubmitCreate = useCallback(
    async (formData) => {
      try {
        await createPost({ url: `/posts`, method: 'post', data: formData })
      } catch (e) {
        console.log(e)
      }
    },
    [createPost]
  )

  const onSubmitUpdate = useCallback(
    async (formData) => {
      try {
        await updatePost({ url: `/posts/${id}`, method: 'put', data: formData })
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
