const fs = require('fs')
const path = require('path')

const routesDir = path.join(__dirname, '..', 'routes')

const getRoutePath = (filename) => {
  const routeName = filename.replace(/\.routes\.js$/, '')
  return `/api/${routeName}`
}

const registerRoutes = (app) => {
  const routeFiles = fs
    .readdirSync(routesDir)
    .filter((file) => file.endsWith('.routes.js'))
    .sort()

  routeFiles.forEach((file) => {
    const router = require(path.join(routesDir, file))
    const basePath = getRoutePath(file)

    app.use(basePath, router)
  })
}

module.exports = { registerRoutes }
