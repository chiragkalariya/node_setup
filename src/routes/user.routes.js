const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../validation/user.validation');

router.get('/', userController.getAllUsers);
router.post('/create', validateUser, userController.createUser);

module.exports = router;