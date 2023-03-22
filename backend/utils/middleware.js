const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('----')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
          })
    }else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    }

    const errorStatus = err.status || 400;

    res.status(errorStatus).json({error: err.message})

    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}