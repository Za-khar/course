import React, { useState } from 'react';
import Header from '../Header/Header';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import Container from '../../containers/Container';
import PropTypes from 'prop-types';

function UserPage({userData}) {
    const [container, setContainer] = useState(<CreateArticleContainer></CreateArticleContainer>);
    const [username, setUsername] = useState({firstName: '', secondName: ''});

    return (
        <>
            <Header handleContainer={setContainer} username={username} setUsername={setUsername}></Header>
            <Container>{container}</Container>           
        </>
    );
}

const objectFile = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
});

const objectAvatar = PropTypes.shape({
    fileId: PropTypes.number.isRequired,
    file: objectFile,
});

const objectUserId = PropTypes.shape({
    id: PropTypes.number.isRequired,
});

const objectLike = PropTypes.shape({
    userId: PropTypes.number.isRequired,
    user: objectUserId,
    date: PropTypes.string.isRequired,
});

const objectArticle = PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(objectFile),
    createdAt: PropTypes.string.isRequired,
    editedAt: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(objectLike),
});

const userObject = PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: objectAvatar,
    articles: PropTypes.arrayOf(objectArticle),
});

const objectUserData = PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: objectAvatar,
    friends: userObject,
    articles: PropTypes.arrayOf(objectArticle),
});

UserPage.propTypes = {
    userData: objectUserData,
}

export default UserPage;
