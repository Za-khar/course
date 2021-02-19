import React from 'react';
import './PostsList.css';
import Article from '../../Article/Article';

import PropTypes from 'prop-types';
import { objectPost } from '../../Article/PropTypes/postType';

function PostsList({postsList}){
    return(
        <div className="articles-block">
            {
                postsList.map(post => <Article key={post.id} postData={post}/>)
            }
        </div>
    );
}

PostsList.propTypes = {
    postsList: PropTypes.arrayOf(objectPost),
}

PostsList.defaultProps = {
    postsList: [],
} 

export default PostsList;