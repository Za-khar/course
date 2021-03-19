import PropTypes from 'prop-types';

export const objectPost = PropTypes.shape({
    post_id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
});