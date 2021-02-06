import React, { useState } from 'react';
import Header from '../Header/Header';
import Container from '../../containers/Container';
import userDataType from './PropTypes/userDataType';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import ArticlesContainer from '../UserContainers/ArticlesPage/ArticlesPage';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import MyProfileContainer from '../UserContainers/MyProfile/MyProfile';

function UserPage({userData}) {
    const [username, setUsername] = useState({firstName: '', secondName: ''});
    const match = useRouteMatch();

    return (
        <>
            <Header username={username}/>
            <Container>
                <Switch>
                    <Route path={`${match.url}`} exact component={ArticlesContainer}/>
                    <Route path={`${match.url}/create-article`} exact component={CreateArticleContainer}/>
                    <Route path={`${match.url}/profile`} exact render={()=> <MyProfileContainer setUsername={setUsername}/>}/>
                </Switch>
            </Container>           
        </>
    );
}

UserPage.propTypes = {
    userData: userDataType,
}

export default UserPage;
