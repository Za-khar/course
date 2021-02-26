import PropTypes from 'prop-types';

export const objectPost = PropTypes.shape({
    id: PropTypes.number.isRequired,
    userID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
});