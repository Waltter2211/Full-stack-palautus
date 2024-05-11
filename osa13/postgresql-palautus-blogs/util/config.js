require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.POSTGRES_URL,
  PORT: process.env.PORT || 3001,
}