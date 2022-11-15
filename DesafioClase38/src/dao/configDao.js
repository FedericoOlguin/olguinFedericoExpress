import MongoProduc from "./MongoDao/Products.dao.js"
import MongoCart from "./MongoDao/Carts.dao.js"
import MongoUser from "./MongoDao/User.dao.js"

let productsService = new MongoProduc()
let cartService = new MongoCart()
let userService = new MongoUser()

const service = {
    productsService,
    cartService,
    userService
}


export default service 