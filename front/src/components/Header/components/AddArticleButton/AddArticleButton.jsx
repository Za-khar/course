import React from 'react';
import './AddArticleButton.css';
import PropTypes from 'prop-types';

function AddArticleButton({clickAddArticleButton}) {
    return (
        <button onClick={clickAddArticleButton} className="add_article__button" name="add_article_button">Add article</button>
    );
}

AddArticleButton.propTypes = {
    clickAddArticleButton: PropTypes.func.isRequired,
}

export default AddArticleButton;

