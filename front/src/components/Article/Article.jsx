import React from 'react';
import './Article.css';
import { Link , useRouteMatch} from 'react-router-dom';
import { objectPost } from './PropTypes/postType';

function Article({ postData }) {
    const match = useRouteMatch();

    const { id, title, content, creation_date } = postData;
    const date = new Date(creation_date);

    return (
        <div className="article">
            <div>
                <span>{date.toDateString() + ' ' + date.toLocaleTimeString()}</span>
                <Link to={`${match.url}/edit-article/${id}`}>
                    Edit
                </Link>
            </div>

            <h3 className="article__title">{title}</h3>
            <p className="article__content">{content}</p>
        </div>
    );
}

Article.propTypes = {
    postData: objectPost,
}

export default Article;