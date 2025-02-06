const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")

// verify token 
exports.authCheck = async(req, res, next) => {
try {
    // รับ Header จาก Client
    const authorization = req.headers.authorization
    console.log(authorization)
    // Check ถ้าไม่มี Token 
    if(!authorization) {
        return createError(400, "Missing Token !!")
    }
    // Bearer token .... ใช้ split แยก req.headers.authorization ออกมาเป้น array [barrer,token]
    const token = authorization.split(" ")[1] // split แล้วเลือกตำแหน่ง [1]

    // verify // ถ้า verify ผ่านก็จะเข้า decode
    jwt.verify(token, process.env.SECRET, (err,decode)=> {
        console.log(err)
        console.log(decode)
        if(err){
            return createError(401, "Unauthorized !!")
        }
        // สร้าง property user = decode (ข้อมูล user จาก token)
        req.user = decode
        next()
    })
    // console.log(token)
    // console.log("Hello, middleware")
    
} catch (error) {
    next(error)
}}