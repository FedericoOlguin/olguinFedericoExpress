import service from "../dao/configDao.js"


const productsController = {

    getAllProducts: async (req, res) => {
        try {
            let products = await service.productsService.getAll()
            res.json({ status: 200, products })
        } catch (err) {
            console.log(err);
        }
    },
    getById: ("/:id", async (req, res) => {
        try {
            let products = await service.productsService.getById(parseInt(req.params.id))
            if (products === null) return res.json({ message: `El Producto con id: ${req.params.id} no existe` })
            res.json({ status: 200, products })
        } catch (err) {
            console.log(err);
        }
    }),
    addProduct: async (req, res) => {
        let product = req.body
        if (product === undefined) return res.json({ status: 400, message: "El producto no se envio correctamente" })
        if (product.name === "" || product.price === "" || product.thumbnail === "" || product.description === "" || product.code === "") return res.json({ status: 400, message: "El producto no se envio correctamente" })
        
        product.timestamp = Date.now()
        product.code = product.timestamp + Math.floor(Math.random() * (1000 - 100) - 100)
        let saveProduct = await service.productsService.save(product)
        res.json({ status: 200, message: "El producto se cargo correctamente", saveProduct })
    },
    delete: async (req, res) => {
        
        let deleted = await service.productsService.delete(req.params.id)
        console.log("---");
        console.log(deleted);
        console.log("---");
        if (!deleted) return res.send("Producto no encontrado")
        res.json({ status: 200, message: `Producto con id: ${req.params.id} eliminado` })
    },
    updateById: async (req, res) => {
        
        let respuesta = await service.productsService.update(req.params.id, req.body)
        if (!respuesta) return res.json({ status: 400, message: "El producto no fue encontrado" })
        res.json({ status: 200, respuesta })
    }

}
export default productsController