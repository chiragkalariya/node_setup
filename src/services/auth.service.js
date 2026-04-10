const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.modal');

exports.register = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        const err = new Error('User already exists');
        err.statusCode = 400;
        throw err;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return user;
}

exports.login = async (data) => {
    const { email, password } = data
  
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const err = new Error('Invalid email or password')
      err.statusCode = 400;
      throw err;
    }
  
    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const err = new Error('Invalid email or password')
      err.statusCode = 400;
      throw err;
    }
  
    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )
  
    return { user, token }
  }
