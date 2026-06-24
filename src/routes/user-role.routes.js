const router = require('express').Router();
const userRoleController = require('../controllers/user-role.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validateUserRole } = require('../validation/user-role.validation');

router.use(authenticate);

router.get('/', userRoleController.getAllUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.post('/', validateUserRole, userRoleController.createUserRole);

module.exports = router;