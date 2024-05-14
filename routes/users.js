const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);
router.delete('/:userId', userController.destroyUserById);

module.exports = router;