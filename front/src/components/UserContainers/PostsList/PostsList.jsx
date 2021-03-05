import React from 'react';
import './PostsList.css';
import Article from '../../Article/Article';

import PropTypes from 'prop-types';
import { objectPost } from '../../Article/PropTypes/postType';

function PostsList({ pagesData, isFetching, showMore, hasNextPage, isFetchingNextPage }) {

    return (
        <div className='articles-block'>
            {isFetching && 'Loading...'}
            {!isFetching && pagesData.map(({ data }) => data.map(post => <Article key={post.id} postData={post} />))}
            <div>
                <button
                    className='load-more__button'
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
    );
}

const objectPage = PropTypes.shape({
    data: PropTypes.arrayOf(objectPost),
    nextCursor: PropTypes.number,
});

PostsList.propTypes = {
    pagesData: PropTypes.arrayOf(objectPage),
    isFetching: PropTypes.bool.isRequired,
    showMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool,
    isFetchingNextPage: PropTypes.bool.isRequired,
}

export default PostsList;