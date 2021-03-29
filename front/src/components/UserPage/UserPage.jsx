import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CreateArticleContainer from '../../containers/Posts/CreateArticleContainer'
import Header from '../Header/Header'
import MyProfileContainer from '../UserContainers/MyProfile/MyProfile'
import PostsListContainer from '../../containers/Posts/PostsList'
import PropTypes from 'prop-types'
import userDataType from './PropTypes/userDataType'

function UserPage({ userData, onSubmitUpdate, uploadAvatar }) {
  const match = useRouteMatch()

  return (
    <div>
      <Header userData={userData} />
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
            render={() => (
              <MyProfileContainer
                userData={userData}
                onSubmitUpdate={onSubmitUpdate}
                uploadAvatar={uploadAvatar}
              />
            )}
          />
        </Switch>
      </Container>
    </div>
  )
}

UserPage.propTypes = {
  userData: userDataType,
  onSubmitUpdate: PropTypes.func,
  uploadAvatar: PropTypes.func,
}

export default UserPage
