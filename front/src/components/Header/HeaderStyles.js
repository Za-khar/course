import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: '10px 0 10px 0',
        backgroundColor: theme.palette.primary.main,
    },
    appBar: {
        justifyContent: 'space-between',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text_color.main
    },
}));