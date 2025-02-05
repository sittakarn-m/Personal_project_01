const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const handleErrors = require("./middlewares/error")
// Routing
const authRouter = require("./routes/auth-route")
const app = express()

// middlewares
app.use(cors()) //Allow cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json

// Routing
app.use("/api", authRouter)


// Handle errors
app.use(handleErrors)

// Start Server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))