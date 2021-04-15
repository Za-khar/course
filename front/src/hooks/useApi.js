import { apiClient } from '../config/axios'
import useAuth from './useAuth'

export default function useApi() {
  const { accessToken, refreshToken, refresh } = useAuth()

  const callApi = async ({ url, method = 'get', data = {} }) => {
    let token
    if (accessToken) {
      const now = new Date()
      const expires = new Date(accessToken.expires)

      now.setMinutes(now.getMinutes() + 1)

      if (now.getTime() < expires.getTime()) {
        token = accessToken.token
      }
    }

    if (!token && refreshToken) {
      token = await refresh()
    }

    if (token) {
      return apiClient({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
    }
  }

  return {
    callApi,
  }
}
