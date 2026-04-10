const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const { connectDB } = require('./src/config/db')

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('API is running...')
})

const userRoutes = require('./src/routes/user.routes')
app.use('/api/users', userRoutes)
const authRoutes = require('./src/routes/auth.routes')
app.use('/api/auth', authRoutes)

// error middleware (last)
const { errorMiddleware } = require('./src/middlewares/error.middleware')
app.use(errorMiddleware)

// Start server after attempting DB connection (server still starts if DB is unavailable).
connectDB()
  .catch((err) => {
    console.error('DB connection error (server will still start):', err?.message || err)
  })
  .finally(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
