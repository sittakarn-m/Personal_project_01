const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")


router.post("/register", authControllers.register)


// ENDPOINT http://localhost:8000/api/register
// Export
module.exports = router