import { Router } from "express"
import ProductsContenedor from "../contenedores/productsContenedor.js"
const productsC = new ProductsContenedor()
const router = Router()
import __dirname from "../utils.js"

router.get("/", async (req, res) => {
    let products = await productsC.getAllProducts()
    res.send(products)
})
router.get("/:id", async (req, res) => {
    let product = await productsC.getById(parseInt(req.params.id))
    if (product === null) return res.send(`El Producto con id:   ${req.params.id} no existe`)
    res.send(product)
})
router.get("/Random", async (req, res) => {
    let products = await productsC.getAllProducts()
    let devolver = Math.floor(Math.random() * (products.length))
    res.send(products[devolver])
})
router.post("/", async (req, res) => {
    let product = req.body
    console.log(req.body);
    // if (!req.file) return res.status(500).send("No se pudo cargar el archivo")
    if (product === undefined) return res.status(400).send("El producto no se envio correctamente")
    if (product.title === "" || product.price === "" || product.thumbnail === "") return res.status(400).send("El producto no se envio correctamente")
    let saveProduct = await productsC.saveProduct(product)
    res.send(saveProduct + "")
})
router.delete("/:id", async (req, res) => {
    let deleted = await productsC.deleteById(req.params.id)
    if (deleted) return res.send("Producto no encontrado")
    res.send(`Producto con id: ${req.params.id} eliminado`)
})
router.put("/:id", async (req, res) => {
    let respuesta = await productsC.updateById(req.params.id, req.body)
    if (!respuesta) return res.status(400).send("El producto no fue encontrado")
    res.send(respuesta)
})

export default router