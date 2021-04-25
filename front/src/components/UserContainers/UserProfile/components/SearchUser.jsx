import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import React, { useCallback, useState } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CustomTextField from '../../../CustomComponents/CustomTextField'
import InputLabel from '@material-ui/core/FormLabel'
import UserList from '../components/UserList'
import useApi from '../../../../hooks/useApi'
import { useQuery } from 'react-query'

function SearchUser({
  handleSendRequest,
  handleDeleteFriend,
  handleCancelRequest,
  handleConfirmRequest,
  handleRejectRequest,
  isOwnPage,
}) {
  const [searchField, setSearchField] = useState(null)
  const { callApi } = useApi()

  const searchSchema = Yup.object().shape({
    search: Yup.string()
      .min(1, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Enter user name or surname!'),
  })

  const { data: res, isFetching, refetch } = useQuery(
    ['search', searchField],
    () => callApi({ url: `/friends/search/${searchField}` }),
    {
      enabled: Boolean(searchField),
    }
  )

  const handleSubmit = useCallback(
    (data) => {
      setSearchField(data.search)
      refetch()
    },
    [setSearchField, refetch]
  )

  return (
    <Card>
      <Formik
        enableReinitialize
        initialValues={{
          search: searchField || '',
        }}
        validationSchema={searchSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, resetForm }) => (
          <Form>
            <InputLabel style={{ marginBottom: 10 }}>Content:</InputLabel>
            <CustomTextField
              id="search"
              name="search"
              value={values.search}
              onChange={handleChange}
              label="Search user..."
              helperText={errors.search}
              error={touched.search && Boolean(errors.search)}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Form>
        )}
      </Formik>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        res && (
          <UserList
            userDataList={res.data}
            title={'Search result:'}
            handleSendRequest={handleSendRequest}
            handleDeleteFriend={handleDeleteFriend}
            handleCancelRequest={handleCancelRequest}
            handleConfirmRequest={handleConfirmRequest}
            handleRejectRequest={handleRejectRequest}
            isOwnPage={isOwnPage}
          />
        )
      )}
    </Card>
  )
}

export default SearchUser
