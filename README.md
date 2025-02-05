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

## Step 7 create function error.js
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

## Step 8 Test post man 
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

## Step 9 create validator Schema for checking data
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

## Step 10 Prisma
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

### migrate
push to mySql
```bash
npx prisme db push
```
```bash
npx prisma migrate dev --name "init"
```

### configs/prisma.js
```js
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma;
```

### update cdoe 

Register 
/controllers/auth-controllers.js
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    // Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // Step 2 validate
    // Step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return createError(400, "Email is already exits!!!");
    }
    // Step 4 Encrypt bcrypt
    // const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    // Step 5 Insert to DB
    const profile = await prisma.profile.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      },
    });
    // Step 6 Response
    res.json({ message: "Register Success" });
  } catch (error) {
    console.log("Step 2 Catch");
    next(error);
  }
};
```
login
```js
exports.login = async (req, res, next) => {
  //code
  try {
    // Step 1 req.bory
    const {email, password} = req.body;
    // console.log(email, password)

    // Step 2 Check email password
    const profile = await prisma.profile.findFirst({
        where: {
            email: email,
        }
    })
    if(!profile) {
        return createError(400, "Email, password is invalid!!")
    }
    const isMatch = bcrypt.compareSync(password, profile.password)
    // console.log(isMatch)

    if(!isMatch) {
        return createError(400, "Eamil, password is invalid !!")
    }
    // Step 3 Generate token
    const payload = {
        id: profile.id,
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        Role: profile.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn:"1d",
    })
    console.log(token);
    // Step 4 Response
    res.json({ 
        message: "Login Success ",
        payload: payload,
        token: token,
     });
  } catch (error) {
    next(error);
  }
};
```

# Update code 
--------------------------------------------------------------------------
### index.js
```js
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const handleErrors = require("./middlewares/error")
// Routing
const authRouter = require("./routes/auth-route")
const userRouter = require("./routes/user-route")
const app = express()

// middlewares
app.use(cors()) //Allow cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing
app.use("/api", authRouter)
app.use("/api", userRouter)


// Handle errors
app.use(handleErrors)

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```

### user-route.js
```js
const express = require("express")
const router = express.Router()
// import controller
const userController = require("../controllers/user-controller")

// ENDPOINT http://localhost:8000/api/users
router.get("/users", userController.listUsers)
router.patch("/user/update-role", userController.updateRole) // ส่งมาบางfield
router.delete("/user/:id", userController.deleteUser)

module.exports = router
```
### user-controller.js
```js
// 1. List all user
// 2. Update Role
// 3. Delete User


exports.listUsers = async (req, res, next) => {
    try {
        res.json({message: "Hello, list users"})
    } catch (error) {
        next(error)
    }
}

exports.updateRole = async (req, res, next) => {
    try {
        res.json({message: "Hello, update role"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        res.json({message: "Hello, Delete user"})
    } catch (error) {
        next(error)
    }
}
```
### auth-route.js
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validator")


router.post("/register", validateWithZod(registerSchema), authControllers.register)
router.post("/login", validateWithZod(loginSchema), authControllers.login)

router.get("/current-user", authControllers.currentUser)


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

### auth-controller.js
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = async (req, res, next) => {
  try {
    // Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // Step 2 validate
    // Step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return createError(400, "Email is already exits!!!");
    }
    // Step 4 Encrypt bcrypt
    // const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    // Step 5 Insert to DB
    const profile = await prisma.profile.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      },
    });
    // Step 6 Response
    res.json({ message: "Register Success" });
  } catch (error) {
    console.log("Step 2 Catch");
    next(error);
  }
};


exports.login = async (req, res, next) => {
  //code
  try {
    // Step 1 req.bory
    const {email, password} = req.body;
    // console.log(email, password)

    // Step 2 Check email password
    const profile = await prisma.profile.findFirst({
        where: {
            email: email,
        }
    })
    if(!profile) {
        return createError(400, "Email, password is invalid!!")
    }
    const isMatch = bcrypt.compareSync(password, profile.password)
    // console.log(isMatch)

    if(!isMatch) {
        return createError(400, "Eamil, password is invalid !!")
    }
    // Step 3 Generate token
    const payload = {
        id: profile.id,
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        Role: profile.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn:"1d",
    })
    console.log(token);
    // Step 4 Response
    res.json({ 
        message: "Login Success ",
        payload: payload,
        token: token,
     });
  } catch (error) {
    next(error);
  }
};


exports.currentUser = async (req, res, next) => {
    //code
    try {
        res.json({message: "Hello, current user"})
    } catch (error) {
        next(error)
    }

}
```

### configs/prisa.js
```js
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = prisma;
```

### middlewares/error.js
```js
const handleErrors = (err, req, res, next) => {
    res
    .status(err.statusCode || 500)
    .json({message: err.message || "Server Error !!!"})
}

module.exports = handleErrors
```

### middlewares/validatotr.js
```js
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
```

### utild/createError.js
```js
const createError = () => {
    console.log("Step 1 Create Error")
    const error = new Error(message)
    error.statusCode = code;
    throw error;
}

module.exports = createError;
```

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

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
```js

```