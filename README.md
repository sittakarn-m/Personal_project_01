### Summary !!!
```
ทำ server register / login 

```

###  in folder Server
tab bar
```
cmd
code .
```
# Server

## Step 1 create Package json
```bash
npm init -y
```

## Step 2 install package ...
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
```
```bash
npx prisma init
```

## Step 3 create Git 
create Repo
```bash
git init
git add .
git commit -m "message"

go to https://github.com/  > new repository > name Project > Create repository > copry code from website
git remote add origin https://github.com/sittakarn-m/Personal_project_01.git
git branch -M main
git push -u origin main

```
### update project to git
```bash
git add .
git commit -m "message"
git push
```

### Step 4 Create server
update package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```
index.js
```js
const express = require("express")
const app = express()

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```
start server
```bash
npm start
```
ctrl + c --- stop

## Step 5 use middlewears
index.js
```js
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

// middlewares
app.use(cors()) //Allow cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```

## Step 6 create authorization
create routes/auth-router.js
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")

router.post("/register", authControllers.register)

// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router
```
create controllers/auth-controller.js
```js
exports.register = (req, res, next) => {
    //code
    try {
        res.json({ message: "hello register" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !!!" })
    }
}
```
## update auth
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")


router.post("/register", authControllers.register)
router.post("/login", authControllers.login)


// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router
```

## create function error.js
สร้าง middleware เพื่อเรียกใช้ createError เหมาะกับการใช้ซ้ำๆ
```js
const handleErrors = (err, req, res, next) => {
    res
    .status(err.statusCode || 500)
    .json({message: err.message || "Server Error !!!"})
}

module.exports = handleErrors
```
and use in index.js
```js
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const handleErrors = require("./middlewares/error")
// Routing
const authRouter = require("./routes/auth-route")

// middlewares
app.use(cors()) //Allow cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing
app.use("/api", authRouter)


// Handle errors
app.use(handleErrors)

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```
update code auth-controller
```js
exports.register = (req, res, next) => {
    //code
    try {
        // console.log(asdasdsadsd) // test error
        res.json({ message: "hello, register" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error !" })
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
```

## Step 7 Test post man 
```
ยิง api
http://localhost:8000/api/register

body > raw > json

{
    "email": "nut@gmail.com",
    "firstname": "Nut",
    "lastname": "lastname",
    "password": "123456",
    "confirmPassword": "12345"
}

ใน ternimal จะ log ออกมาทั้งหมด

```

# update code for testing postman
index.js
```js
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const handleErrors = require("./middlewares/error")
// Routing
const authRouter = require("./routes/auth-route")
const app = express()

// middlewares
app.use(cors()) //Allow cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing
app.use("/api", authRouter)


// Handle errors
app.use(handleErrors)

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```
auth-route.js
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")


router.post("/register", authControllers.register)
router.post("/login", authControllers.login)


// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router

// Register Checking !!!
// Step 1 req.boy
// Step 2 validate
// Step 3 Check already
// Step 4 Encrypt bcrypt
// Step 5 Instert to DB
// Step 6 Response
```
auth-controller.js
```js
exports.register = (req, res, next) => {
    //code
    try {
        // Step 1 req.boy
        const {email, firstname, lastname, password, confirmPassword} = req.body
        console.log(req.body)
        // Step 2 validate
        if(!email) {
            return res.status(400).json({message: "Email is require"})
        }
        if(!firstname){
            return res.status(400).json({message: "firstname is require"})
        }
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
```
error.js
```js
const handleErrors = (err, req, res, next) => {
    res
    .status(err.statusCode || 500)
    .json({message: err.message || "Server Error !!!"})
}

module.exports = handleErrors
```
## install package zod
zod for validator
```bash
npm i zod
```

## create Schema for checking
auth-route.js
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")
const { z } = require("zod")

//npm i zod

const registerSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "First name should more than 3 letters"),
    lastname: z.string().min(3, "Lastname should more than 3"),
    password: z.string().min(6, "Password shoud longer than 6"),
    confirmPassword: z.string().min(6, "Comfirm password should more than 6")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password is correct",
    path: ["confirmPassword"]
})

const loginSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"),
    password: z.string().min(6, "Password shoud longer than 6"),
})

//TEST Validator
const validateWithZod = (schema) => (req, res, next) => {
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

router.post("/register", validateWithZod(registerSchema), authControllers.register)
router.post("/login", validateWithZod(loginSchema), authControllers.login)


// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router
```

## แยกไฟล์ 
auht-route.js
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validator")


router.post("/register", validateWithZod(registerSchema), authControllers.register)
router.post("/login", validateWithZod(loginSchema), authControllers.login)


// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router
```
middlewares/validator.js
```js
const { z } = require("zod")

//npm i zod
//TEST Validator

exports.registerSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "First name should more than 3 letters"),
    lastname: z.string().min(3, "Lastname should more than 3"),
    password: z.string().min(6, "Password shoud longer than 6"),
    confirmPassword: z.string().min(6, "Comfirm password should more than 6")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password is correct",
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
```

## Prisma
.env
```prisma
DATABASE_URL="mysql://root:123456@localhost:3306/landmark"
```
prisma/schema.prisma
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
```prisma
model Profile {
  id Int @id @default(autoincrement())
  email String
  firstname String
  lastname String
  role Role @default(USER)
  password String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```