import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  dialog_title: {
    margin: 'auto',
    padding: '30px 200px 10px 200px',
  },
  dialog_content: {
    padding: '0 30px 30px 30px',
    paddingBottom: '110px',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
  },
  image_list: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  preview_image: {
    display: 'flex',
    position: 'relative',
    marginBottom: '50px',
    width: '80%',
  },
})
