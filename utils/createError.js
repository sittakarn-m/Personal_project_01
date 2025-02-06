const createError = (code, message) => {
    
    console.log("Step 1 Create Error")
    const error = new Error(message)
    error.statusCode = code;
    throw error;
}

module.exports = createError;