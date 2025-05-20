const errorHandler = (error, req, res, next) => {
    console.log(error)
    const message = error.message || "server error"
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: message
    }
    res.status(error.statusCode || 500).json(data)
}

export default errorHandler