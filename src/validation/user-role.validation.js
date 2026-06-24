exports.validateUserRole = (req, res, next) => {
    const { role_name } = req.body;
    if (!role_name) {
        return res.status(400).json({ message: 'Role name is required' });
    }
    next();
};

exports.validateUserRoleUpdate = (req, res, next) => {
    const { role_name } = req.body;
    if (!role_name) {
        return res.status(400).json({ message: 'Role name is required' });
    }
    next();
};