const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set true for debug
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate()
    // Ensure models are registered before syncing tables.
    require('../models/user.modal')
    await sequelize.sync()
    console.log('✅ Database connection successful')
  } catch (error) {
    console.error('❌ Database connection failed:', error?.message || error)
    throw error
  }
}

module.exports = { sequelize, connectDB }