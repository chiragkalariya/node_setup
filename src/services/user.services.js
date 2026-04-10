const User = require('../models/user.modal').User;

exports.getAllUsers = async () => {
    return await User.findAll();
}

exports.createUser = async (user) => {
    const existingUser = await User.findOne({
        where: { email: user.email }
      })
    
      if (existingUser) {
        const error = new Error('User already exists')
        error.statusCode = 400
        throw error 
      }
    
    return await User.create(user);
}