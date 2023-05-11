const { model } = require("mongoose")

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ?  null : err.stack
    })
}

module.exports = errorHandler