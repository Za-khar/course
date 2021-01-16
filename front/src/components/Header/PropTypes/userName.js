import PropTypes from 'prop-types';

const objectUsername = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired
});

export default objectUsername;