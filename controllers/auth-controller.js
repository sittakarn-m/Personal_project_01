exports.register = (req, res, next) => {
    //code
    try {
        // Step 1 req.boy
        console.log(req.body)
        // Step 2 validate
        // Step 3 Check already
        // Step 4 Encrypt bcrypt
        // Step 5 Instert to DB
        // Step 6 Response
        // console.log(asdasdsadsd) // test error
        res.json({ message: "hello, register" })
    } catch (error) {
        // console.log(error)
        // res.status(500).json({ message: "Server Error !" })
        next(error)
    }
}

exports.login = (req, res, next) => {
    //code
    try {
        // console.log(asdasdsadsd) // test error
        res.json({ message: "hello, login" })
    } catch (error) {
        // console.log(error.message)
        // res.status(500).json({ message: "Server Error !!" })

        // เรียกใช้ error จาก error.js
        next(error)
    }
}