const express = require("express")
const router = express.Router()
// import controller
const userController = require("../controllers/user-controller")

// ENDPOINT http://localhost:8000/api/users
router.get("/users", userController.listUsers)
router.patch("/user/update-role", userController.updateRole) // ส่งมาบางfield
router.delete("/user/:id", userController.deleteUser)







module.exports = router