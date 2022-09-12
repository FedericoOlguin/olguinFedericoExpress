import { Router } from "express";
import ProductsContenedor from "../contenedores/productsContenedor.js"
import db from "../optionsDb/SQLite3.js";
import faker from "faker"
const productsC = new ProductsContenedor()

faker.locale = "es"

const { commerce, image, random,datatype } = faker
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

router.get("/products-test", async (req, res) => {
    let products = []
    for (let i = 0; i < 5; i++) {
        products.push({
            name: commerce.product(),
            price: commerce.price(),
            description: commerce.productDescription(),
            stock: Math.floor(Math.random() * 1000 + 1),
            // thumbnail: image.image()
            thumbnail: random.image(),
            _id: datatype.uuid()
        })
        // console.log(products[i]._id);
    }
    res.render("productsTest", {
        products: products
    })

})

export default router 