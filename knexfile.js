const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.resolve(__dirname, process.env.BUILD, 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, process.env.BUILD, 'database', 'seeds')
  },
  useNullAsDefault: true
}
