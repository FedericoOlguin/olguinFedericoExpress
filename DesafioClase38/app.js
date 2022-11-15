import express from "express";
import prodRouter from "./src/routes/productsRouter.js"
import cartRouter from "./src/routes/cartRouter.js"
const admin = true
const app = express()


const PORT = process.env.PORT || 8080


app.use(express.json())
app.use("/api/products", addDato, prodRouter)
app.use("/api/cart", cartRouter)

const server = app.listen(PORT, () => console.log("Server connect on port " + PORT))



function addDato(req, res, next) {
    req.user = admin
    next()
}