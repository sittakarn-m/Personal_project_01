# Server

## Step 1 install package
คำสั่งนี้จะสร้าง ไฟล์ package.json ขึนมา
```bash
npm init -y 
```

## Step 2 
install package
```bash
npm install express cors nodemon morgan dotenv
```

## Step 3 Create index.js
create file server
```bash
server/index,js
```

## Step 4 Edit package .json
ทำให้เราใช้ node start ในการ run server 
```json
{  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  }}
```

## Step 5 Setup index.js 
```js
// import lib...
const express = require("express");
const cors = require("cors"); // ใช้ได้เลย 
const morgan = require("morgan"); // ใช้ได้เลย
require('dotenv').config()
// Import Routing...
const productsRoute = require("../routes/products") 


const app = express();

// Middlewares
app.use(cors()) // allow crossdomains
app.use(express.json()) // read json
app.use(morgan("dev")) // show log

// Routing
app.use('/api', productsRoute)

// http://localhost:8000/api/products
// Method GET
app.get("/api/products", (req, res)=>{
    console.log("Hello Products")
    res.json({ message: "Hello, Products"})
})

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

```

## Step 6 create .env
ใส่ port ที่ต้องการ
```bash
PORT=8000
```

## Step 7 create products
create folder /routes/products.js
```js
// Routing รวบรวม ENDPOINT ต่างๆ

const express = require('express')
const router = express.Router()

// @ENDPOINT http://localhost:8000/api/products
router.get('/products', (req, res) => {

    console.log("Hello, GET Product")
    res.json({message: "Hello, Product GET"})
});


module.exports = router;
```

### update code to routing
```js
// Routing รวบรวม ENDPOINT ต่างๆ

const express = require('express')
const router = express.Router()

// @ENDPOINT http://localhost:8000/api/products
router.get('/products', (req, res) => {
    console.log("Hello, GET Product")
    res.json({message: "Hello, Product GET"})
});

// select สินค้า จาก id
router.get("/product/:id", (req, res) => {
    res.json({message: "Hello, GET Product ID"})
})

// เพิ่ม สินค้า ก็ส่งไปทั้งหมด
router.post("/product", (req, res) => {
    res.json({message: "Hello, POST Product"})
})

// อัพเดท สินค้าด้วย id
router.put("/product/:id", (req, res) => {
    res.json({message: "Hello, PUT Product"})
})

// delete product
router.delete("/product/:id", (req, res) => {
    res.json({message: "Hello, DELETE Product"})
})


// exports
module.exports = router;
```



### Updating code with create controller product
```js
// Routing รวบรวม ENDPOINT ต่างๆ
const express = require('express')
const router = express.Router()
//import controller
const productController = require("../controllers/products")
// import middlewares
const { auth } = require("../middlewares/auth")


// @ENDPOINT http://localhost:8000/api/products
router.get('/products',auth, productController.listProducts);
// select สินค้า จาก id
router.get("/product/:id", productController.readProduct)
// เพิ่ม สินค้า ก็ส่งไปทั้งหมด
router.post("/product", productController.createProduct)
// อัพเดท สินค้าด้วย id
router.put("/product/:id", productController.updateProduct)
// delete product
router.delete("/product/:id", productController.deleteProduct)


// exports
module.exports = router;
```

# Step 8 create product.js in controllers folder
แยกไฟล์ products เอามาไว้ใน controller
```js
const { message } = require("statuses")

exports.listProducts = (req, res) => {
    res.json({ message: "Hello Controller List Products" })
}

exports.readProduct = (req, res) => {
    res.json({ message: "Hello, GET Product ID" })
}

exports.createProduct = (req, res) => {
    res.json({ message: "Hello, POST Product" })
}

exports.updateProduct = (req, res) => {
    res.json({ message: "Hello, PUT Product" })
}

exports.deleteProduct = (req, res) => {
    res.json({ message: "Hello, DELETE Product" })
}
```

# Step 9 create auth.js 
สร้าง authorized เอาไว้เชคความปลอดภัย

## update index
เอา auth ไปใช้ใน routes/product.js

# Step 10 create error
สร้าง error.js ใน middleware
```js
const handleError = (err, req, res, next) => {
    //code
    res
    .status(err.statusCode || 500)
    .json({message: err.message || "Someting Wrong!!!"})
}

module.exports = handleError;
```


## create error.js in uits 


## gitenv
```
DATABASE_URL="myslq://root:123456@localhost:3306/cc19_interhome"
```

## Create prisma
npx prisma init

## schema.prisma
สร้าง bluprint 
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int    @id @default(autoincrement())
  email        String
  password     String
  firstName    String @map("first_name")
  lastName     String @map("last_name")
  phone        String
  qrCode       String @map("qr_code")
  profileImage String @map("profile_image")
  role         Role   @default(AGENT)

  @@map("user")
}
```
relation
