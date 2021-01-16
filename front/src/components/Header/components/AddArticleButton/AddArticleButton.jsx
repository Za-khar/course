import React from 'react';
import './AddArticleButton.css';
import CreateArticleContainer from '../../../UserContainers/CreateArticle/CreateArticle';
import PropTypes from 'prop-types';

function AddArticleButton({clickAddArticleButton}) {
    return (
        <button onClick={() => clickAddArticleButton(<CreateArticleContainer/>)} className="add_article__button">Add article</button>
    );
}

AddArticleButton.propTypes = {
    clickAddArticleButton: PropTypes.func.isRequired,
}

export default AddArticleButton;

