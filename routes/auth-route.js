const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validator")
const { authCheck } = require("../middlewares/auth-middleware")


router.post("/register", validateWithZod(registerSchema), authControllers.register)
router.post("/login", validateWithZod(loginSchema), authControllers.login)

router.get("/current-user", authCheck, authControllers.currentUser)


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