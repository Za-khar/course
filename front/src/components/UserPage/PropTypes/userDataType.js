import PropTypes from 'prop-types';

const objectFile = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
});

const objectAvatar = PropTypes.shape({
    fileId: PropTypes.number.isRequired,
    file: objectFile,
});

const objectUserId = PropTypes.shape({
    id: PropTypes.number.isRequired,
});

const objectLike = PropTypes.shape({
    userId: PropTypes.number.isRequired,
    user: objectUserId,
    date: PropTypes.string.isRequired,
});

const objectArticle = PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(objectFile),
    createdAt: PropTypes.string.isRequired,
    editedAt: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(objectLike),
});

const userObject = PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: objectAvatar,
    articles: PropTypes.arrayOf(objectArticle),
});

const objectUserData = PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: objectAvatar,
    friends: PropTypes.arrayOf(userObject),
    articles: PropTypes.arrayOf(objectArticle),
});

export default objectUserData;