module.exports.errorMiddleware = async (err, req, res, next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error' });
}