import { Router } from "express";
import ProductsContenedor from "../contenedores/contenedor.js"
const productsC = new ProductsContenedor()


const router = Router()


router.get("/", (req, res) => {

    res.render("form", {
        saludo: "Desafio de Motores de Plantillas"
    })
})
router.get("/products", async (req, res) => {
    let list = await productsC.getAllProducts()
    res.render("productsList", {
        products: list,
        hasProducts: !list.length > 0
    })
})



export default router 