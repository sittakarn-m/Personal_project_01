const { z } = require("zod")

//npm i zod
//TEST Validator

exports.registerSchema = z.object({
    email: z.string()
        .trim()
        .email("Invalid email format")
        .describe("User email address"),
    firstname: z.string().min(3, "First name should be at least 3 characters"),
    lastname: z.string().min(3, "Last name should be at least 3 characters"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

exports.loginSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"),
    password: z.string().min(6, "Password shoud longer than 6"),
})


exports.validateWithZod = (schema) => (req, res, next) => {
    try {
        console.log("hello, middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message)
        const errTxt = errMsg.join(",")
        const mergeError = new Error(errTxt)
        next(mergeError);
    }
};