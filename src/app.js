const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const { registerRoutes } = require('./utils/registerRoutes')
const { errorMiddleware } = require('./middlewares/error.middleware')

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('API is running...')
})

registerRoutes(app)

app.use(errorMiddleware)

module.exports = app