## create
```src/
├── config/
│   ├── cloudinary.js
│   ├── prismaClient.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── uploadController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── uploadMiddleware.js
├── models/
│   ├── User.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── uploadRoutes.js
├── utils/
│   ├── helpers.js
├── server.js
```
## Prisma Schema

สร้างไฟล์ schema.prisma เพื่อกำหนดโครงสร้างฐานข้อมูล MySQL:
```js
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // ใช้ environment variable สำหรับเชื่อมต่อ MySQL
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   @default("USER") // Roles: ADMIN, USER
  profilePicture String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
## ไฟล์ prismaClient.js

ไฟล์นี้ใช้สำหรับเชื่อมต่อกับ Prisma Client:
```js
// src/config/prismaClient.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
```
ไฟล์ prismaClient.js

ไฟล์นี้ใช้สำหรับเชื่อมต่อกับ Prisma Client:
```js
// src/config/prismaClient.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
```
## ไฟล์ authController.js

จัดการฟังก์ชันที่เกี่ยวข้องกับการ Authentication เช่น Register, Login, Forgot Password:
```js
// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaClient");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, "secret_key", {
    expiresIn: "1h",
  });
  res.json({ token });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = jwt.sign({ userId: user.id }, "secret_key", {
    expiresIn: "15m",
  });
  res.json({ message: "Password reset token generated", resetToken });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, "secret_key");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
```
## ไฟล์ userController.js

จัดการฟังก์ชันที่เกี่ยวข้องกับ User เช่น เพิ่ม/ลบ/อัปเดต User:
```js
// src/controllers/userController.js
const prisma = require("../config/prismaClient");

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { name, email },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "User deleted" });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
```
## ไฟล์ authRoutes.js และ userRoutes.js

แยก Routes ตามฟังก์ชันการทำงาน:
```js
// src/routes/authRoutes.js
const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
```
```js
// src/routes/userRoutes.js
const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", authenticate, authorize(["ADMIN"]), getAllUsers);
router.get("/:id", authenticate, getUserById);
router.post("/", authenticate, authorize(["ADMIN"]), createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteUser);

module.exports = router;
```
## ไฟล์ server.js

รวม Routes และ Middleware:
```js
// src/server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
## เชื่อมต่อ MySQL

ในไฟล์ .env กำหนดค่าเชื่อมต่อ MySQL:

```
ทดสอบ API ด้วย Postman

    Register: POST /api/auth/register

    Login: POST /api/auth/login

    Get All Users: GET /api/users (ต้องเป็น ADMIN)

    Create User: POST /api/users (ต้องเป็น ADMIN)

    Update User: PUT /api/users/:id

    Delete User: DELETE /api/users/:id (ต้องเป็น ADMIN)
```
