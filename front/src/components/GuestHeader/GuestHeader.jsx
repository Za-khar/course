import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import useStyles from '../Header/HeaderStyles'

function GuestHeader() {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => history.push('/login')

  return (
    <AppBar className={classes.root} position="static">
      <Container>
        <Toolbar className={classes.appBar}>
          <Typography variant="h3">Swiftchat</Typography>
          <Button variant="outlined" color="inherit" onClick={handleClick}>
            SignUp/SignIn
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default GuestHeader
