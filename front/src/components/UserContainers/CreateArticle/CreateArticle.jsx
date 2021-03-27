import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CustomRadioField from './components/CustomRadioField'
import CustomTextField from './components/CustomTextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from './components/DialogTitle'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/FormLabel'
import { PropTypes } from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { useHistory } from 'react-router-dom'
import useStyles from './CreateArticleStyles'

function CreateArticle({ postData, onSubmit, isCreate }) {
  const [isOpen, setIsOpen] = useState(true)
  const classes = useStyles()
  const history = useHistory()
  const {
    title: currentTitle,
    content: currentContent,
    access: currentAccess,
  } = postData

  const postsSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required very important field!'),
    content: Yup.string()
      .min(1, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required very important field!'),
    access: Yup.string().oneOf(['all', 'friends', 'me']),
  })

  const handleSubmit = async (data) => {
    await onSubmit(data)
    history.push(`/home`)
  }

  const handleClose = () => {
    setIsOpen(false)
    history.push(`/home`)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        className={classes.dialog_title}
      >
        {isCreate ? 'Create article' : 'Edit article'}
      </DialogTitle>
      <DialogContent className={classes.dialog_content}>
        <Formik
          enableReinitialize
          initialValues={{
            title: currentTitle,
            content: currentContent,
            access: currentAccess,
          }}
          validationSchema={postsSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Box mb={3} className={classes.input}>
                <InputLabel>Title:</InputLabel>
                <CustomTextField
                  id="title"
                  onChange={handleChange}
                  name="title"
                  label="Enter title..."
                  helperText={errors.title && touched.title && errors.title}
                  fullWidth
                  error={touched.title && Boolean(errors.title)}
                />
              </Box>
              <Box mb={3} className={classes.input}>
                <InputLabel style={{ marginBottom: 10 }}>Content:</InputLabel>
                <CustomTextField
                  id="content"
                  name="content"
                  multiline
                  onChange={handleChange}
                  label="Enter content..."
                  helperText={errors.content}
                  variant="outlined"
                  rows={8}
                  fullWidth
                  error={touched.title && Boolean(errors.title)}
                ></CustomTextField>
              </Box>
              <FormLabel component="legend">Access:</FormLabel>
              <RadioGroup
                aria-label="position"
                name="position"
                value={values.access}
                style={{ marginBottom: 20 }}
                onChange={handleChange}
              >
                <CustomRadioField
                  value="all"
                  control={<Radio color="primary" />}
                  label="All"
                  labelPlacement="end"
                  name="access"
                />
                <CustomRadioField
                  value="friends"
                  control={<Radio color="primary" />}
                  label="For Friends"
                  labelPlacement="end"
                  name="access"
                />
                <CustomRadioField
                  value="me"
                  control={<Radio color="primary" />}
                  label="Only me"
                  labelPlacement="end"
                  name="access"
                />
              </RadioGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const objectPost = PropTypes.shape({
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.oneOf(['all', 'friends', 'me']).isRequired,
})

CreateArticle.propTypes = {
  postData: objectPost.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isCreate: PropTypes.bool.isRequired,
}

export default CreateArticle
