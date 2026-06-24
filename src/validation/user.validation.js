exports.validateUser = (req, res, next) => {
    const { name, email, password, user_role_id } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    if (!user_role_id) {
        return res.status(400).json({ message: 'User role is required' });
    }

    next();
};

exports.validateUserUpdate = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }

    next();
};
