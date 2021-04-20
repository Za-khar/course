import PostsList from '../../components/UserContainers/PostsList/PostsList'
import React from 'react'
import { useInfiniteQuery, useQueryClient, useMutation } from 'react-query'
import useApi from '../../hooks/useApi'

function PostsListContainer() {
  const queryClient = useQueryClient()
  const { callApi } = useApi()

  const infiniteFetch = async ({ pageParam = 0 }) => {
    const {
      data: {
        data,
        meta: { total },
      },
    } = await callApi({ url: `/posts?offset=${pageParam}` })
    let cursor
    if (total - (pageParam + 3) > 0) {
      cursor = pageParam + 3
    }
    return {
      data: data,
      nextCursor: cursor,
    }
  }

  const {
    data: response,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('posts', infiniteFetch, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })
  const pagesData = response?.pages || []

  const showMore = () => fetchNextPage()

  const { mutate: deletePost } = useMutation(callApi, {
    onSuccess: () => queryClient.invalidateQueries('posts'),
  })

  return (
    <PostsList
      pagesData={pagesData}
      isFetching={isLoading}
      showMore={showMore}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      deletePost={deletePost}
    />
  )
}

export default PostsListContainer
