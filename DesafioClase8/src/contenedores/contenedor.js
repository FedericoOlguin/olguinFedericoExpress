import fs from "fs"

const path = "./src/public/files/products.json"

class ProductsContenedor {

    getAllProducts = async () => {

        try {
            if (fs.existsSync(path)) {
                let dataFile = await fs.promises.readFile(path, "utf-8")
                return JSON.parse(dataFile)
            } else {
                return []
            }
        } catch (err) {
            console.log("No se puede leer el archivo " + err);
        }
    }

    saveProduct = async (product) => {
        let products = await this.getAllProducts()
        try {
            if (products.length === 0) {
                product.id = 1
                products.push(product)
                await fs.promises.writeFile(path, JSON.stringify(products, null, 2))
                return product.id
            } else {
                product.id = (products[products.length - 1].id + 1)
                products.push(product)
                await fs.promises.writeFile(path, JSON.stringify(products, null, 2))
                return product.id
            }
        } catch (err) {
            console.log("No se puede escribir el archivos " + err);
        }
    }

    getById = async (id) => {
        try {
            let products = await this.getAllProducts()
            let retornar = products.find(res => res.id === id)
            if (retornar === undefined) {
                console.log("El usuario con el id: " + id + " no existe");
                return null
            } else {
                return retornar
            }
        } catch (err) {
            console.log("No se puede leer el archivo " + err);
        }


    }

    deleteById = async (id) => {
        let products = await this.getAllProducts()
        try {
            if (products.find(res => res.id + "" === "" + id)) {
                let newArray = products.filter(res => res.id != id)
                await fs.promises.writeFile(path, JSON.stringify(newArray, null, 2))
                return false
            } else {
                return true
            }
        } catch (err) {
            console.log("No se puede escribir el archivo " + err);
        }
    }

    deleteAll = async () => {
        try {
            if (fs.existsSync(path)) {
                await fs.promises.unlink(path)
            }
        } catch (err) {
            console.log("No se puede escribir el archivo " + err);
        }
    }

    updateById = async (id, newProduct) => {
        let products = await this.getAllProducts()
        const { title, price, thumbnail } = newProduct
        console.log(title, price, thumbnail);
        try {
            if (products.find(res => res.id + "" === "" + id)) {
                console.log("si entra a la cuestion");
                let newArray = products.map(res => res.id + "" === id + "" ? { ...res, title, price, thumbnail } : { ...res })
                await fs.promises.writeFile(path, JSON.stringify(newArray, null, 2))
                console.log(newArray.find(res => res.id + "" === "" + id));
                return newArray.find(res => res.id + "" === "" + id)
            }
            return null

        } catch (err) {
            console.log("No se puede escribir el archivo " + err);
        }
    }
}


// module.exports = ProductsContenedor

export default ProductsContenedor