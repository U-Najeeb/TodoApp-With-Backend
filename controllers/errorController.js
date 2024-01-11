const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "Error"
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        stack : err.stack
    })
}
module.exports =  globalErrorHandler