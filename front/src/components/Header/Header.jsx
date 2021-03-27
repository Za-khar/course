import { Link, useRouteMatch } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import UserInfo from './components/UserInfo/UserInfo'
import useStyles from './HeaderStyles'
import userNameType from './PropTypes/userName'

function Header({ username }) {
  const match = useRouteMatch()
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static">
      <Container>
        <Toolbar className={classes.appBar}>
          <Link to={`${match.url}`} className={classes.link}>
            <Typography variant="h3">Swiftchat</Typography>
          </Link>
          <Link to={`${match.url}/create-article`} className={classes.link}>
            <Button variant="outlined" color="inherit">
              Add Article
            </Button>
          </Link>
          <UserInfo username={username} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Header.propTypes = {
  username: userNameType,
}

export default Header
