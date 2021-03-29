import { apiClient } from '../../../config/axios'

export const updateUser = async ({ formData }) => {
  return apiClient.put(`/users`, formData)
}

export const uploadUserAvatar = async ({ formData }) => {
  return apiClient.post(`/files/upload-avatar`, formData)
}

export const getOneUser = async () => {
  return apiClient.get(`/users`)
}
