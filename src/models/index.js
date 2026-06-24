const fs = require('fs')
const path = require('path')
const { sequelize } = require('../config/db')

const models = {}

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.modal.js'))
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file))
    Object.assign(models, modelModule)
  })

module.exports = {
  sequelize,
  ...models,
}
