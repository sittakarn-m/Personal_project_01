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

## Step 6 create routes and controllers
create auth-router
```js
const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")

router.post("/register", authControllers.register)

// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router
```
create auth-controller
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