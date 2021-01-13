import React, { useState } from 'react';
import Header from '../Header/Header';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import Container from '../../containers/Container';

function UserPage() {
    const [container, setContainer] = useState(<CreateArticleContainer></CreateArticleContainer>);
    const [username, setUsername] = useState({firstName: '', secondName: ''});

    return (
        <>
            <Header handleContainer={setContainer} username={username} setUsername={setUsername}></Header>
            <Container>{container}</Container>           
        </>
    );
}

export default UserPage;
