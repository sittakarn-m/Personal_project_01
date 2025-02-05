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