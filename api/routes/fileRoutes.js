const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { checkAuthorized } = require('../middleware/acl');

router.post('/upload-avatar', [
    checkAuthorized,
], fileController.uploadAvatar);

router.get('/avatar', [
    checkAuthorized,
], fileController.getAvatar);

router.delete('/delete-avatar', [
    checkAuthorized,
], fileController.deleteAvatar);

module.exports = router;