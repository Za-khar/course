import React, { useState } from "react";
import Header from "../Header/Header";
import userDataType from "./PropTypes/userDataType";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import PostsListContainer from "../../containers/Posts/PostsList";
import CreateArticleContainer from "../../containers/Posts/CreateArticleContainer";
import MyProfileContainer from "../UserContainers/MyProfile/MyProfile";
import Container from "@material-ui/core/Container";

function UserPage({ userData }) {
  const [username, setUsername] = useState({ firstName: "", secondName: "" });
  const match = useRouteMatch();

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
  );
}

UserPage.propTypes = {
  userData: userDataType,
};

export default UserPage;
