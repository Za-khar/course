import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
    },
    user_info: {
        display: 'flex',
        alignItems: 'center',
    },
    menu_item: {
        textDecoration: 'none',
        color: theme.palette.text_color.main,
    }
}));