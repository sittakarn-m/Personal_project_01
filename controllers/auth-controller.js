exports.register = (req, res, next) => {
    //code
    try {
        res.json({ message: "hello, register" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !!!" })
    }
}

