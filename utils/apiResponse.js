// Success response format
exports.success = (statusCode, message, data) => {
    return {
        error: false,
        code: statusCode,
        message: message,
        data: data
    };
};

// Error response format
exports.error = (statusCode, message) => {
    return {
        error: true,
        code: statusCode,
        message: message
    };
};