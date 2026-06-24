require('dotenv').config()

const app = require('./src/app')
const { connectDB } = require('./src/config/db')

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await connectDB()

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other process: lsof -i :${PORT}`)
      } else {
        console.error('Server error:', error.message)
      }
      process.exit(1)
    })
  } catch (error) {
    console.error('Failed to start server:', error?.message || error)
    process.exit(1)
  }
}

startServer()
