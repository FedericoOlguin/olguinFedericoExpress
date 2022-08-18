import { Router } from "express"
import ProductsContenedor from "../contenedores/productsContenedor.js"
import db from "../optionsDb/SQLite3.js"
const productsC = new ProductsContenedor()
const router = Router()
import __dirname from "../utils.js"

router.get("/", async (req, res) => {
    // let products = await productsC.getAllProducts()
    let products = await db("products").select("*")
    res.send(products)
})
router.get("/:id", async (req, res) => {
    // let product = await productsC.getById(parseInt(req.params.id))
    let product = await db("products").select("*").where("id", req.params.id)
    if (product.length === 0) return res.send(`El Producto con id:   ${req.params.id} no existe`)
    res.send(product)
})
// router.get("/Random", async (req, res) => {
//     let products = await productsC.getAllProducts()
//     let devolver = Math.floor(Math.random() * (products.length))
//     res.send(products[devolver])
// })
router.post("/", async (req, res) => {
    let product = req.body
    // if (!req.file) return res.status(500).send("No se pudo cargar el archivo")
    if (product === undefined) return res.status(400).send("El producto no se envio correctamente")
    if (product.title === "" || product.price === "" || product.thumbnail === "") return res.status(400).send("El producto no se envio correctamente")
    // let saveProduct = await productsC.saveProduct(product)
    let saveProduct = await db("products").insert(product)
    res.send(saveProduct + "")
})
router.delete("/:id", async (req, res) => {
    // let deleted = await productsC.deleteById(req.params.id)
    let deleted = await db("products").where("id", req.params.id).del()
    console.log(deleted);
    if (deleted !== 1) return res.send("Producto no encontrado")
    res.send(`Producto con id: ${req.params.id} eliminado`)
})
router.put("/:id", async (req, res) => {
    // let respuesta = await productsC.updateById(req.params.id, req.body)
    let respuesta = await db("products").where("id", req.params.id).update({ ...req.body })
    if (!respuesta === 1) return res.status(400).send("El producto no fue encontrado")
    res.json({ status: 200, message: "producto actualizado" })
})

export default router