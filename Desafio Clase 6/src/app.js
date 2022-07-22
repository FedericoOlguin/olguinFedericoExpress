import express from "express"
import ProductsContenedor from "./contenedores/contenedor.js"

const productsC = new ProductsContenedor()

const app = express()
const PORT = 8080


app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })

app.get("/productos", async (req, res) => {
    let products = await productsC.getAllProducts()
    res.send(products)
})
app.get("/producto", async (req, res) => {
    let product = await productsC.getById(parseInt(req.query.id))
    res.send(product)
})
app.get("/productoRandom", async (req, res) => {
    let products = await productsC.getAllProducts()
    let devolver = Math.floor(Math.random() * (products.length))
    res.send(products[devolver])
})
