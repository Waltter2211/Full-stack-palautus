const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'SequelizeValidationError') {
    return response.status(500).send({ error: ["Validation isEmail on username failed"] })
  }

  next(error)
}

module.exports = errorHandler