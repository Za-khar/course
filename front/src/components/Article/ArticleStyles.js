import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: '75%',
        marginBottom: theme.spacing(15),
        padding: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'red',
    },
    card_menu: {
        justifyContent: 'space-between',
    },
    post_title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 18
    }
}));