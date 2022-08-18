import ProductsContenedor from "../contenedores/productsContenedor.js"
import db from "../optionsDb/SQLite3.js"
const productsC = new ProductsContenedor()





const productsController = {

    getAllProducts: async (req, res) => {
        // let products = await productsC.getAllProducts()
        let products = await db("products").select("*")
        return { status: 200, products }
    },
    // getById: ("/:id", async (req, res) => {
    //     let product = await productsC.getById(parseInt(req.params.id))
    //     if (product === null) return res.send(`El Producto con id:   ${req.params.id} no existe`)
    //     res.send(product)
    // }),
    addProduct: async (req) => {
        let product = req.obj
        // console.log(req.obj);
        if (product === undefined) return ({ status: 400, message: "El producto no se envio correctamente" })
        if (product.title === "" || product.price === "" || product.thumbnail === "") return ({ status: 400, message: "El producto no se envio correctamente" })
        // let saveProduct = await productsC.saveProduct(product)
        let saveProduct = await db("products").insert(product)
        return ({ status: 200, message: "El producto se cargo correctamente", products: [...saveProduct] })

    },
    // delete: ("/:id", async (req, res) => {
    //     let deleted = await productsC.deleteById(req.params.id)
    //     if (deleted) return res.send("Producto no encontrado")
    //     res.send(`Producto con id: ${req.params.id} eliminado`)
    // }),

}
export default productsController