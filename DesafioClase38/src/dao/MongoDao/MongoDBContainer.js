import mongoose from "mongoose"
// import config from "../../config/config.js"

export default class MongoDBContainer {
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema)
    }

    getAll = async () => {
        let res = await this.model.find()
        return res
    }

    save = async (element) => {
        let res = await this.model.create(element)
        return res
    }

    delete = async (id) => {
        let res = await this.model.findByIdAndDelete({ _id: id })
        return res
    }

    update = async (id, data) => {
        let res = await this.model.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
        return res
    }

    getById = async (id) => {
        let res = await this.model.findById({ _id: id }, { _id: 0 })
        return res
    }
    // getProducts = async (id) => {
    //     let res = await this.model.findById({ _id: id }, { products: 1 })
    //     return res
    // }
}