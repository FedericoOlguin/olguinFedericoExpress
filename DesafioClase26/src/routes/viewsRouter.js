import { Router } from "express";
import ProductsContenedor from "../contenedores/productsContenedor.js"
import db from "../optionsDb/SQLite3.js";
import faker from "faker"
const productsC = new ProductsContenedor()

faker.locale = "es"

const { commerce, image, random, datatype } = faker
const router = Router()


router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/current")
    } else {
        res.render("register")
    }
})
router.get("/current", (req, res) => {
    if (req.session.user) {
        res.render("form", {
            user: req.session.user,
            hasUser: true
        })

    } else {
        res.redirect("logIn")
    }
})
router.get("/logIn", (req, res) => {
    res.render("logIn")
})
router.get("/logout", (req, res) => {
    const user = req.session.user
    req.session.destroy()
    res.render("logOut", {
        user: user
    })
})
router.get("/current", (req, res) => {
    res.render("form", {
        saludo: "Desafio Log-in ",
        user: req.session.user
    })

})
router.get("/products", async (req, res) => {
    let list = await db("products").select("*")
    res.render("productsList", {
        products: list,
        hasProducts: !list.length > 0
    })
})
router.get("/errorLogin", async (req, res) => {
    res.render("errLogin")
})
router.get("/errRegister", async (req, res) => {
    res.render("errRegister")
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