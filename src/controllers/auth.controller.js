exports.login = async (data) => {
    const { email, password } = data
  
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('Invalid email or password')
    }
  
    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid email or password')
    }
  
    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )
  
    return { user, token }
  }