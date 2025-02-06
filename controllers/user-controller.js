// 1. List all user
// 2. Update Role
// 3. Delete User
const prisma = require("../configs/prisma")


exports.listUsers = async (req, res, next) => {
    try {
        // findMamy จะส่งทุงรายชื่อใน table เราออกไป แต่ถ้าใส่ () เงือนไขเข้าไปก็จะเลยบางสิ่ง
        // เลือกสิ่ง ที่อยากส่งกลับไป
        const users = await prisma.profile.findMany({
            // select: {
            //     id: true,
            //     email: true,
            //     firstname: true,
            //     role: true,
            //     updatedAt: true,
            //     createdAt: true
            // }
            // omit เอาทุงอย่างนอกจาก ที่ เลือก
            omit: {
                password: true,
            }
        })
        console.log(users)
        res.json({ message: "Hello, list users", result: users })
    } catch (error) {
        next(error)
    }
}




exports.updateRole = async (req, res, next) => {
    try {
        const { id, role } = req.body
        console.log(id, role)
        // console.log(typeof id)

        // update อะไรที่ไหน 
        // update ที่ id... เปลี่ยน role เป็น ... ส่งจาก postman
        const updated = await prisma.profile.update({
            where: {
                id: Number(id),
            },
            data: {
                role: role,
            }
        })

        res.json({ message: "Update Success" })
    } catch (error) {
        next(error)
    }
}




exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await prisma.profile.delete({
            where: {
                id: Number(id),
            },
        })
        console.log(deleted)
        res.json({ message: "Deleted" })
    } catch (error) {
        next(error)
    }
}