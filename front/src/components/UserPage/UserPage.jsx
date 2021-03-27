import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CreateArticleContainer from '../../containers/Posts/CreateArticleContainer'
import Header from '../Header/Header'
import MyProfileContainer from '../UserContainers/MyProfile/MyProfile'
import PostsListContainer from '../../containers/Posts/PostsList'
import userDataType from './PropTypes/userDataType'

function UserPage({ userData }) {
  const [username, setUsername] = useState({ firstName: '', secondName: '' })
  const match = useRouteMatch()

  return (
    <div>
      <Header username={username} />
      <Container>
        <Switch>
          <Route
            path={`${match.url}`}
            exact
            sensitive
            strict
            component={PostsListContainer}
          />
          <Route
            path={[
              `${match.url}/create-article`,
              `${match.url}/edit-article/:id(\\d+)`,
            ]}
            exact
            sensitive
            strict
            render={(routerProps) => (
              <CreateArticleContainer id={routerProps.match.params.id} />
            )}
          />
          <Route
            path={`${match.url}/profile`}
            exact
            sensitive
            strict
            render={() => <MyProfileContainer setUsername={setUsername} />}
          />
        </Switch>
      </Container>
    </div>
  )
}

UserPage.propTypes = {
  userData: userDataType,
}

export default UserPage
