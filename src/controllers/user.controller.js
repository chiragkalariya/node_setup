const userServices = require('../services/user.services');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await userServices.getCurrentUser(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userServices.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await userServices.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error, "error");
        
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userServices.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userServices.deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
