## 1. create package.json
```bash
npm init -y
```

## 2. install package
```bash
npm i express cors dotenv bcryptjs jsonwebtoken cloudinary multer nodemon morgan express-rate-limit
```
ความหมาย
```
Express: เป็น web application framework ของ Node.jsที่ทำให้การสร้างแอปพลิเคชันเว็บและ API ง่ายขึ้น มีการใช้งานแพร่หลายและมีโครงสร้างที่ยืดหยุ่น

CORS (Cross-Origin Resource Sharing): เป็น middleware ที่ใช้ใน Express เพื่อตั้งค่า policy สำหรับการเข้าถึงทรัพยากรจาก domain อื่นๆ เช่น การอนุญาตให้เว็บเซิร์ฟเวอร์รับ request จาก domain อื่น

dotenv: ใช้ในการโหลด environment variables จากไฟล์ .env เข้าสู่ process.env เพื่อเก็บข้อมูลที่ต้องการความปลอดภัย เช่น API keys และ config settings

bcryptjs: เป็น library ที่ใช้ในการเข้ารหัสและตรวจสอบความถูกต้องของ passwords โดยการใช้ hashing algorithm เช่น bcrypt

jsonwebtoken (JWT): ใช้ในการสร้างและตรวจสอบ JSON Web Tokens (JWTs) เพื่อการ authentication และ authorization ภายในแอปพลิเคชัน

Cloudinary: เป็น cloud service ที่ใช้ในการจัดการและเก็บรูปภาพและวิดีโอ สามารถอัพโหลด แปลงค่า และแสดงผลไฟล์สื่อต่างๆ ได้

multer: เป็น middleware สำหรับ handling multipart/form-data ซึ่งเป็นรูปแบบข้อมูลที่ใช้ในการอัพโหลดไฟล์บน Express

nodemon: เป็นเครื่องมือที่ใช้ในการพัฒนา Node.jsโดยจะทำการ restart server โดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงใน source code

morgan: เป็น middleware สำหรับ logging HTTP requests ในแอปพลิเคชัน Express เพื่อให้สามารถตรวจสอบและบันทึกข้อมูลการใช้งานได้

express-rate-limit: ใช้ในการจำกัดจำนวน requests ที่ผู้ใช้สามารถส่งมายังเซิร์ฟเวอร์ในช่วงเวลาที่กำหนด เพื่อป้องกันการโจมตีแบบ DDoS และ brute-force attacks
```
## 3 create server
```js

```
## setup folder
```
Routes
Controllers
Middleware
Utilities
```


## not-found create-limit create-error
เตรียมไว้เลยจะเหมือนเดิม

##
```bash
npx prisma init
```
## .env
```env
PORT=8081

DATABASE_URL="mysql://root:123456@localhost:3306/cc19_todolist_v2"

JWT_SECRET=123456
```
## schema.prisma
เข้าไปเขียน bluprint จาก ER diagram
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  username String @db.VarChar(50) // db.VarChar(50) ไม่เกิน 50 ตัว
  password String
  email    String @unique

  todolist Todolist[]

  @@map("user")
}

model Todolist {
  id         Int      @id @default(autoincrement())
  title      String
  statusTodo Boolean  @default(false) @map("status_todo")
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamp(0)
  updatedAt  DateTime @updatedAt @map("updated_at") @db.Timestamp(0)
  userId     Int

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("todolist")
}


```
## หลังจาก เสร็จแล้วก็ push ขึ้นไปที่ mySQL
```bash
npx prisma db push
```

## สร้าง prisma.js ใน models