import { Router } from "express"
import productsController from "../controllers/ProducController.js"

const router = Router()


router.route("/")
    .get(productsController.getAllProducts)
    .post(productsController.addProduct)

router.route("/:id")
    .get(productsController.getById)
    .delete(productsController.delete)
    .put(productsController.updateById)



export default router