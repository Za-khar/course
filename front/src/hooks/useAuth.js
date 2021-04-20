import { useCallback, useContext } from 'react'

import { Context } from '../authStore'
import { apiClient } from '../config/axios'
import { useMutation } from 'react-query'

export default function useAuth() {
  const [state, dispatch] = useContext(Context)

  const authMutation = useMutation(
    async ({ data, url }) =>
      apiClient.post(url, {
        ...data,
      }),
    {
      onSuccess: (res) => {
        const data = res?.data
        dispatch({
          type: 'SET_AUTH',
          payload: {
            user: data.user,
            accessToken: data.authTokens.access,
            refreshToken: data.authTokens.refresh,
          },
        })
        localStorage.setItem(
          'refreshToken',
          JSON.stringify(data.authTokens.refresh)
        )
      },
    }
  )

  const refresh = useCallback(() => {
    if (state.refreshToken && state.refreshToken.expires) {
      const now = new Date()

      const expires = new Date(state.refreshToken.expires)

      if (now.getTime() < expires.getTime()) {
        return apiClient
          .post('/auth/refresh-auth', {
            refreshToken: state.refreshToken.token,
          })
          .then((res) => {
            dispatch({
              type: 'SET_AUTH',
              payload: {
                user: res.data.user,
                accessToken: res.data.authTokens.access,
                refreshToken: res.data.authTokens.refresh,
              },
            })
            localStorage.setItem(
              'refreshToken',
              JSON.stringify(res.data.authTokens.refresh)
            )

            return res.data.authTokens.access.token
          })
          .catch(() => {
            dispatch({
              type: 'SET_AUTH',
              payload: {
                user: null,
                accessToken: null,
                refreshToken: null,
              },
            })
            localStorage.removeItem('refreshToken')
          })
      }
    }
  }, [state, dispatch])

  const logoutMutation = useMutation(
    async () => {
      if (state.refreshToken) {
        return apiClient.post('/auth/logout', {
          refreshToken: state.refreshToken.token,
        })
      }

      return false
    },
    {
      onSuccess: () => {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            user: null,
            accessToken: null,
            refreshToken: null,
          },
        })
        localStorage.removeItem('refreshToken')
      },
    }
  )

  return {
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    authMutation,
    logoutMutation,
    refresh,
  }
}
