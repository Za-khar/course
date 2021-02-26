import React from 'react';
import './Article.css';

import { objectPost } from './PropTypes/postType';

function Article({postData}){
    const {title, content} = postData;
    return(
        <div className="article">
            <h3 className="article__title">{ title }</h3>
            <p className="article__content">{ content }</p>
        </div>
    );
}

Article.propTypes = {
    postData: objectPost,
}

export default Article;