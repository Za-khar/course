import React, { useState } from 'react';
import Header from '../Header/Header';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import Container from '../../containers/Container';
import userDataType from './PropTypes/userDataType';

function UserPage({userData}) {
    const [container, setContainer] = useState(<CreateArticleContainer/>);
    const [username, setUsername] = useState({firstName: '', secondName: ''});

    return (
        <>
            <Header handleContainer={setContainer} username={username} setUsername={setUsername}/>
            <Container>{container}</Container>           
        </>
    );
}

UserPage.propTypes = {
    userData: userDataType,
}

export default UserPage;
