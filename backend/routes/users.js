const router = require('express').Router();

const {
  getAllUsers, getUser, getUserById, updateProfile, updateUserAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validate');

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = router;
