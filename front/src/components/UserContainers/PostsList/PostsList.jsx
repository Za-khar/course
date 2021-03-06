import './PostsList.css'

import ArticleContainer from '../../../containers/Posts/ArticleContainer'
import PropTypes from 'prop-types'
import React from 'react'
import { objectPost } from '../../Article/PropTypes/postType'

function PostsList({
  pagesData,
  isFetching,
  showMore,
  hasNextPage,
  isFetchingNextPage,
  deletePost,
}) {
  return (
    <div className="articles-block">
      {isFetching && 'Loading...'}
      {!isFetching &&
        pagesData.map(({ data }) =>
          data.map((post) => (
            <ArticleContainer
              key={post.post_id}
              postData={post}
              deletePost={deletePost}
            />
          ))
        )}
      <div>
        <button
          className="load-more__button"
          onClick={showMore}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  )
}

const objectPage = PropTypes.shape({
  data: PropTypes.arrayOf(objectPost),
  nextCursor: PropTypes.number,
})

PostsList.propTypes = {
  pagesData: PropTypes.arrayOf(objectPage),
  isFetching: PropTypes.bool.isRequired,
  showMore: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired,
}

export default PostsList
