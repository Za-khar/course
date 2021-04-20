import TextField from '@material-ui/core/TextField'
import { useField } from 'formik'

function CustomTextField(props) {
  const [field] = useField(props)

  return <TextField {...field} {...props} />
}

export default CustomTextField
