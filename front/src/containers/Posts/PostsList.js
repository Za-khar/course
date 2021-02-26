import React, {useState, useEffect} from 'react';
import PostsList from '../../components/UserContainers/PostsList/PostsList';

import {getPosts} from './hooks/getPosts';

function PostsListContainer() {
    const [posts, setPosts] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getPostsData = async () => {
        const {data} = await getPosts();
        setPosts(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getPostsData, []);
    
    return(
        <PostsList postsList={posts}/>
    );
}

export default PostsListContainer;