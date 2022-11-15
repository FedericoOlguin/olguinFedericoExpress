import { Router } from "express";
import CartController from "../controllers/CartController.js"

const router = Router()
const { createCart, deleteCart, getProductsCart, addProducts, deleteProduct } = CartController

router.route("/")
    .post(createCart)


router.route("/:id")
    .delete(deleteCart)

router.route("/:id/products")
    .get(getProductsCart)
    .post(addProducts)

router.route("/:id/product/:id_prod")
    .delete(deleteProduct)


export default router