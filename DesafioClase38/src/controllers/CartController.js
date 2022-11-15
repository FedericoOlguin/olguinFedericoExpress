import service from "../dao/configDao.js";


const CartController = {
    createCart: async (req, res) => {
        try {
            let obj = req.body ? ({ ...req.body }) : ({})
            let idCart = await service.cartService.save(obj)
            res.json({ status: 200, cartId: idCart._id })
        } catch (err) {
            res.json({ status: 500, message: "Algo salio mal, vuelava a intentar nuevamente mas tarde" })
        }
    },
    deleteCart: async (req, res) => {
        try {
            let array = await service.cartService.delete(req.params.id)
            if (!array) return res.json({ status: 400, message: "El producto no se encontro o ya fue eliminado" })
            res.json({ status: 200, array })
        } catch (err) {
            res.json({ status: 500, message: "Algo salio mal, vuelava a intentar nuevamente mas tarde" })
        }
    },
    getProductsCart: async (req, res) => {
        try {
            let cart = await service.cartService.getProducts(req.params.id)
            res.json({ status: 200, cart })
        } catch (err) {
            res.json({ status: 500, message: "Algo salio mal, vuelava a intentar nuevamente mas tarde" })
        }
    },
    addProducts: async (req, res) => {
        let prod = {}
        const otro = req.body
        try {
            let cartU = await service.cartService.getById(req.params.id)
            if (!cartU) return res.json({ status: 400, message: "EL carrito no existe" })
            if (!cartU.products.find(prod => prod.id_prod + "" === req.body.id_prod + "")) {
                let array = [...cartU.poducts]
                console.log("en no");
                array.push(req.body)
                prod = {
                    ...cartU,
                    products: array
                }
            } else {
                console.log("en si");
                let newList = cartU.products.map(prod => prod.id_prod + "" === req.body.id_prod + "" ? { ...prod, quantity: prod.quantity + req.body.quantity } : { ...prod })
                cartU.products = [...newList]
                prod = {
                    ...cartU,
                    products: newList
                }
            }
            let cart = await service.cartService.update(req.params.id, prod)
            res.json({ status: 200, cart })

        } catch (err) {
            res.json({ status: 500, message: "Algo salio mal, vuelava a intentar nuevamente mas tarde" })
        }
    },
    deleteProduct: async (req, res) => {
        const { id, id_prod } = req.params
        try {
            let cartU = await service.cartService.getById(id)
            if (!cartU) return res.json({ status: 400, message: "EL carrito no existe" })
            cartU.products = [...cartU.products.filter(prod => prod.id_prod + "" !== id_prod + "")]
            let cart = await service.cartService.deleteProduct(req.params.id, req.params.id_prod)
            if (!cart) return res.json({ status: 400, message: "No se econtro el producto" })
            res.json({ status: 200, cart })
        } catch (err) {
            res.json({ status: 500, message: "Algo salio mal, vuelava a intentar nuevamente mas tarde" })
        }
    },

}


export default CartController