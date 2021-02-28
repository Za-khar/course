import React from 'react';
import PostsList from '../../components/UserContainers/PostsList/PostsList';
import { getPosts } from './hooks/articleRequests';

import {
    useInfiniteQuery,
} from 'react-query';

function PostsListContainer() {
    const { data: response, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        'posts',
        getPosts,
        {
            getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        }
    );

    const pagesData = response?.pages || [];

    const showMore = () => fetchNextPage();
    
    return (
        <PostsList
            pagesData={pagesData}
            isFetching={isLoading}
            showMore={showMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    );
}

export default PostsListContainer;