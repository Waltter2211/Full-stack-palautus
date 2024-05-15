const errorHandler = (error, request, response, next) => {
  console.error(error.message, "asdadsadasd")

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'SequelizeValidationError' && error.message === 'asd') {
    return response.status(500).send({ error: ["Validation isEmail on username failed"] })
  }
  if (error.name === 'SequelizeValidationError' && error.message === 'Validation error: Validation max on writingYear failed') {
    return response.status(500).send({ error: ["Writing year cannot be more than current year"] })
  }
  if (error.name === 'SequelizeValidationError' && error.message === 'Validation error: Validation min on writingYear failed') {
    return response.status(500).send({ error: ["Writing year cannot be less than 1991"] })
  }

  next(error)
}

module.exports = errorHandler