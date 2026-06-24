const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate()
    require('../models')
    console.log('✅ Database connection successful')
  } catch (error) {
    console.error('❌ Database connection failed:', error?.message || error)
    throw error
  }
}

module.exports = { sequelize, connectDB }