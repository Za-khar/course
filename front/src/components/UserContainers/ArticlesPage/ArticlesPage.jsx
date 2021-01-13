import React from 'react';
import './ArticlesPage.css';
import Article from '../../Article/Article';

function Articles(){
    return(
        <div className="articles-block">
            <Article></Article>
            <Article></Article>
            <Article></Article>
            <Article></Article>
        </div>
    );
}

export default Articles;