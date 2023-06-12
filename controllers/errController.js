'use strict'

exports.logErrors = (err, req, res, next) => {
  console.error(`There is something wrong! Here: ${err.stack}`)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode })
}

exports.get404 = (req, res) => {
  res
    .status(404)
    .json({ pageTitle: 'Nothing to be found.' })
}
