import { apiClient } from '../../../config/axios'

export const getPosts = async ({ pageParam = 0 }) => {
  const {
    data: {
      data,
      meta: { total },
    },
  } = await apiClient.get(`/posts?offset=${pageParam}`)
  let cursor

  if (total - (pageParam + 3) > 0) {
    cursor = pageParam + 3
  }

  return {
    data: data,
    nextCursor: cursor,
  }
}

export const createPostRequest = async ({ formData }) => {
  return apiClient.post(`/posts`, formData)
}

export const updatePostRequest = async ({ id, formData }) => {
  return apiClient.put(`/posts/${id}`, formData)
}

export const getOnePost = async ({ id }) => {
  return apiClient.get(`/posts/${id}`)
}
