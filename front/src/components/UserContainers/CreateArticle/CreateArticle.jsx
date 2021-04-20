import 'cropperjs/dist/cropper.css'

import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Cropper from 'react-cropper'
import CustomRadioField from '../../CustomComponents/CustomRadioField'
import CustomTextField from '../../CustomComponents/CustomTextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from './components/DialogTitle'
import FormLabel from '@material-ui/core/FormLabel'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/FormLabel'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { PropTypes } from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { useHistory } from 'react-router-dom'
import useStyles from './CreateArticleStyles'

const FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

function CreateArticle({ postData, onSubmit, isCreate }) {
  const [files, setFiles] = useState([])
  const [croppedFiles, setCroppedFiles] = useState([])
  const [croppers, setCroppers] = useState([])
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
    const formData = new FormData()
    for (let prop in data) {
      formData.append(prop, data[prop])
    }
    for (let croppedFile of croppedFiles) {
      const base64 = await fetch(croppedFile)
      const file = await base64.blob()
      formData.append('files', file)
    }
    await onSubmit(formData)
  }

  const handleClose = () => {
    setIsOpen(false)
    history.push(`/home`)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const filesData = e.target.files
    if (filesData.length <= 4) {
      for (let fileData of filesData) {
        if (FILE_TYPES.includes(fileData.type) && fileData.size < 10000000) {
          const reader = new FileReader()
          reader.onload = () => {
            setFiles((files) => [...files, reader.result])
          }
          reader.readAsDataURL(fileData)
        }
      }
    }
  }

  const cropFile = () => {
    for (let cropper of croppers) {
      if (typeof cropper !== 'undefined') {
        setCroppedFiles((croppedFiles) => [
          ...croppedFiles,
          cropper.getCroppedCanvas().toDataURL(),
        ])
      }
    }
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
                  value={values.title}
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
                  value={values.content}
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
              {isCreate && (
                <Box mb={3}>
                  <InputLabel style={{ marginRight: 10 }}>
                    {croppedFiles.toString()
                      ? 'Preview images:'
                      : 'Upload images (max: 4):'}
                  </InputLabel>
                  {!croppedFiles.toString() && (
                    <>
                      <input
                        accept="accept=.png, .jpg, .jpeg"
                        id="upload-files"
                        type="file"
                        multiple
                        onChange={handleUpload}
                        hidden
                      />
                      <label htmlFor="upload-files">
                        <IconButton color="primary" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </>
                  )}

                  {files.toString() &&
                    !croppedFiles.toString() &&
                    files.map((file, index) => (
                      <Box mb={3} key={index}>
                        <Cropper
                          src={file}
                          onInitialized={(instance) =>
                            setCroppers((croppers) => [...croppers, instance])
                          }
                          key={index}
                        />
                      </Box>
                    ))}
                  {files.toString() && !croppedFiles.toString() && (
                    <Button variant="contained" onClick={cropFile}>
                      Crop
                    </Button>
                  )}

                  {croppedFiles.toString() && (
                    <Box className={classes.image_list}>
                      {croppedFiles.map((croppedFile, index) => (
                        <Card className={classes.preview_image} key={index}>
                          <img
                            style={{ width: '100%' }}
                            src={croppedFile}
                            key={index}
                            alt=""
                          />
                        </Card>
                      ))}
                    </Box>
                  )}
                </Box>
              )}

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
