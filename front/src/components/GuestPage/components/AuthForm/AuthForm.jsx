import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import CustomTextField from '../../../CustomComponents/CustomTextField'
import InputLabel from '@material-ui/core/FormLabel'
import { Link } from 'react-router-dom'
import SocialButton from '../../../CustomComponents/SocialButton'
import Typography from '@material-ui/core/Typography'
import config from '../../../../Config.json'
import useAuth from '../../../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import useStyles from './AuthFormStyles'

function AuthForm({ authUrl, socAuthUrl, isLogin }) {
  const { authMutation } = useAuth()
  let history = useHistory()
  const classes = useStyles()
  const queryClient = useQueryClient()
  const userSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .matches(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        'Is not in correct format'
      )

      .required('Required very important field!'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required very important field!'),
  })

  const handleSubmit = useCallback(
    (data) => {
      authMutation.mutate(
        { data, url: authUrl },
        {
          onSuccess: () => {
            history.push('/home')
          },
        }
      )
    },
    [authMutation]
  )

  const handleSocialLogin = useCallback(
    (data) => {
      authMutation.mutate(
        { data, url: socAuthUrl },
        {
          onSuccess: () => {
            history.push('/home')
          },
        }
      )
      // history.push('/home')
    },
    [authMutation]
  )

  const handleSocialLoginFailure = (err) => {
    window.location.reload()
    console.error(err)
  }

  return (
    <Container>
      <Card className={classes.root}>
        <Typography variant="h6" className={classes.form__title}>
          {isLogin ? 'Sing in with:' : 'Registration with'}
        </Typography>
        <Box mb={4}>
          <SocialButton
            className={classes.facebook_login}
            provider="facebook"
            appId={config.FACEBOOK_CLIENT_ID}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Facebook
          </SocialButton>
          <SocialButton
            className={classes.google_login}
            provider="google"
            appId={config.GOOGLE_CLIENT_ID}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Google
          </SocialButton>
        </Box>
        {authMutation.error && authMutation.error.response.data && (
          <Box>
            <Typography variant="h6">
              {authMutation.error.response.data.message}
            </Typography>
          </Box>
        )}
        <Formik
          enableReinitialize
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Box mb={4} className={classes.input_blocks}>
                <InputLabel>Email:</InputLabel>
                <CustomTextField
                  id="email"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  helperText={errors.email && touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
              </Box>
              <Box mb={4} className={classes.input_blocks}>
                <InputLabel>Password:</InputLabel>
                <CustomTextField
                  id="password"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  error={touched.password && Boolean(errors.password)}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLogin ? 'Login' : 'Registration'}
              </Button>
            </Form>
          )}
        </Formik>
        <Box>
          {isLogin ? (
            <Link to="/reg">registration</Link>
          ) : (
            <Link to="/login">login</Link>
          )}
        </Box>
      </Card>
    </Container>
  )
}

export default AuthForm
