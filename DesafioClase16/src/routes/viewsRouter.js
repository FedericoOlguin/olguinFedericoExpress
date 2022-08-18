import { Router } from "express";
import ProductsContenedor from "../contenedores/productsContenedor.js"
const productsC = new ProductsContenedor()
import db from "../optionsDb/SQLite3.js";


const router = Router()


router.get("/", (req, res) => {

    res.render("form", {
        saludo: "Desafio Base de datos "
    })
})
router.get("/products", async (req, res) => {
    let list = await db("products").select("*")
    console.log(list);
    res.render("productsList", {
        products: list,
        hasProducts: !list.length > 0
    })
})



export default router 