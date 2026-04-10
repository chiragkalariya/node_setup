const userServices = require('../services/user.services');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const user = await userServices.createUser(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}