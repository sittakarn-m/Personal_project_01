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