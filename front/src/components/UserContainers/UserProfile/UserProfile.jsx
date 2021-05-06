import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CustomAvatar from '../../CustomComponents/CustomAvatar'
import CustomRadioField from '../../CustomComponents/CustomRadioField'
import CustomTextField from '../../CustomComponents/CustomTextField'
import InputLabel from '@material-ui/core/FormLabel'
import { PropTypes } from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import SearchUser from './components/SearchUser'
import UserList from './components/UserList'
import { friendType } from './PropTypes/usersType'
import useAuth from '../../../hooks/useAuth'
import { useQueryClient } from 'react-query'
import useStyles from './UserProfileStyles'
import userDataType from '../../UserPage/PropTypes/userDataType'

function UserProfile({
  onSubmitUpdate,
  uploadAvatar,
  resFriends,
  isFetchingFriends,
  resInReq,
  resOutReq,
  isFetchingInReq,
  isFetchingOutReq,
  handleSendRequest,
  handleCancelRequest,
  handleConfirmRequest,
  handleDeleteFriend,
  handleRejectRequest,
  userData,
  isOwnPage,
}) {
  const queryClient = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const { user } = useAuth()

  const classes = useStyles()

  const path = isOwnPage
    ? queryClient.getQueryData('avatar')?.data?.path
    : userData.path

  const {
    first_name,
    last_name,
    phone_number,
    email,
    show_email,
    show_phone_number,
  } = isOwnPage ? user : userData

  const initialValues = {
    first_name: first_name || '',
    last_name: last_name || '',
    phone_number: phone_number || '',
    email: email || '',
    show_email: show_email || 'all',
    show_phone_number: show_phone_number || 'all',
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const avatar = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', avatar)
    await uploadAvatar(formData)
  }
  const handleEdit = (resetForm) => {
    if (resetForm) {
      resetForm()
    }
    setEditMode(!editMode)
  }

  const usersSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(1, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required very important field!'),
    last_name: Yup.string()
      .min(1, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required very important field!'),
    phone_number: Yup.string().length(
      12,
      'Phone number must be exactly 12 character'
    ),
  })

  const handleSubmit = async (data) => {
    await onSubmitUpdate(data)
    setEditMode(false)
  }

  return (
    <>
      <Card className={classes.root}>
        <Box>
          <input
            accept="accept=.png, .jpg, .jpeg"
            id="upload-avatar"
            type="file"
            onChange={handleUpload}
            hidden
          />
          <label htmlFor="upload-avatar">
            <CustomAvatar path={path} name={first_name} />
          </label>
        </Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={usersSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange, resetForm }) => (
            <Form>
              <Box mb={3}>
                <InputLabel>First name:</InputLabel>
                <CustomTextField
                  disabled={!editMode}
                  id="first_name"
                  onChange={handleChange}
                  name="first_name"
                  value={values.first_name}
                  label="..."
                  helperText={
                    errors.first_name && touched.first_name && errors.first_name
                  }
                  error={touched.first_name && Boolean(errors.first_name)}
                />
              </Box>
              <Box mb={3}>
                <InputLabel>Last name:</InputLabel>
                <CustomTextField
                  disabled={!editMode}
                  id="last_name"
                  onChange={handleChange}
                  name="last_name"
                  value={values.last_name}
                  label="..."
                  helperText={
                    errors.last_name && touched.last_name && errors.last_name
                  }
                  error={touched.last_name && Boolean(errors.last_name)}
                />
              </Box>
              <Box mb={3}>
                <InputLabel>Phone number:</InputLabel>
                <CustomTextField
                  disabled={!editMode}
                  id="phone_number"
                  onChange={handleChange}
                  name="phone_number"
                  value={values.phone_number}
                  label="..."
                  helperText={
                    errors.phone_number &&
                    touched.phone_number &&
                    errors.phone_number
                  }
                  error={touched.phone_number && Boolean(errors.phone_number)}
                />
                {isOwnPage && (
                  <RadioGroup
                    aria-label="show_phone_number"
                    name="show_phone_number"
                    value={values.show_phone_number}
                    style={{ marginBottom: 20 }}
                    onChange={handleChange}
                  >
                    <CustomRadioField
                      disabled={!editMode}
                      value="all"
                      control={<Radio color="primary" />}
                      label="All"
                      name="show_phone_number"
                    />
                    <CustomRadioField
                      disabled={!editMode}
                      value="friends"
                      control={<Radio color="primary" />}
                      label="For Friends"
                      name="show_phone_number"
                    />
                    <CustomRadioField
                      disabled={!editMode}
                      value="me"
                      control={<Radio color="primary" />}
                      label="Only me"
                      name="show_phone_number"
                    />
                  </RadioGroup>
                )}
              </Box>
              <Box mb={3}>
                <InputLabel>Email:</InputLabel>
                <CustomTextField
                  disabled
                  id="email"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  label="..."
                  helperText={errors.email && touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
                {isOwnPage && (
                  <RadioGroup
                    aria-label="show_email"
                    name="show_email"
                    value={values.show_email}
                    style={{ marginBottom: 20 }}
                    onChange={handleChange}
                  >
                    <CustomRadioField
                      disabled={!editMode}
                      value="all"
                      control={<Radio color="primary" />}
                      label="All"
                      name="show_email"
                    />
                    <CustomRadioField
                      disabled={!editMode}
                      value="friends"
                      control={<Radio color="primary" />}
                      label="For Friends"
                      name="show_email"
                    />
                    <CustomRadioField
                      disabled={!editMode}
                      value="me"
                      control={<Radio color="primary" />}
                      label="Only me"
                      name="show_email"
                    />
                  </RadioGroup>
                )}
              </Box>
              {isOwnPage && !editMode && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit.bind(null, null)}
                >
                  Edit
                </Button>
              )}
              {isOwnPage && editMode && (
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              )}
              {isOwnPage && editMode && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit.bind(null, resetForm)}
                >
                  Cancel
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Card>
      {isOwnPage && (
        <SearchUser
          handleSendRequest={handleSendRequest}
          handleDeleteFriend={handleDeleteFriend}
          handleCancelRequest={handleCancelRequest}
          handleConfirmRequest={handleConfirmRequest}
          handleRejectRequest={handleRejectRequest}
          isOwnPage={isOwnPage}
        />
      )}
      {isFetchingFriends ? (
        <span>Loading...</span>
      ) : (
        resFriends && (
          <UserList
            userDataList={resFriends.data}
            title="Friends:"
            handleDeleteFriend={handleDeleteFriend}
            isOwnPage={isOwnPage}
          />
        )
      )}
      {isFetchingOutReq ? (
        <span>Loading...</span>
      ) : (
        resOutReq && (
          <UserList
            userDataList={resOutReq.data}
            title="My req:"
            handleCancelRequest={handleCancelRequest}
            isOwnPage={isOwnPage}
          />
        )
      )}
      {isFetchingInReq ? (
        <span>Loading...</span>
      ) : (
        resInReq && (
          <UserList
            userDataList={resInReq.data}
            title="Req in me:"
            handleConfirmRequest={handleConfirmRequest}
            handleRejectRequest={handleRejectRequest}
            isOwnPage={isOwnPage}
          />
        )
      )}
    </>
  )
}

UserProfile.propTypes = {
  uploadAvatar: PropTypes.func,
  onSubmitUpdate: PropTypes.func,
  resFriends: PropTypes.shape({ data: PropTypes.arrayOf(friendType) }),
  isFetchingFriends: PropTypes.bool,
  resInReq: PropTypes.shape({ data: PropTypes.arrayOf(friendType) }),
  resOutReq: PropTypes.shape({ data: PropTypes.arrayOf(friendType) }),
  isFetchingInReq: PropTypes.bool,
  isFetchingOutReq: PropTypes.bool,
  handleSendRequest: PropTypes.func,
  handleCancelRequest: PropTypes.func,
  handleConfirmRequest: PropTypes.func,
  handleDeleteFriend: PropTypes.func,
  handleRejectRequest: PropTypes.func,
  userData: userDataType,
  isOwnPage: PropTypes.bool,
}

export default UserProfile
