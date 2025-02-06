const express = require("express")
const router = express.Router()
// import controller
const userController = require("../controllers/user-controller")
const { authCheck } = require("../middlewares/auth-middleware")

// ENDPOINT http://localhost:8000/api/users
router.get("/users", authCheck, userController.listUsers)
router.patch("/user/update-role", authCheck, userController.updateRole) // ส่งมาบางfield
router.delete("/user/:id", authCheck, userController.deleteUser)







module.exports = router