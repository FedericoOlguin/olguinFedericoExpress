import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";


const collection = "products"

const productsSchema = mongoose.Schema({
    name: { type: String },
    timestamp: { type: String, default: Date.now() + "" },
    description: { type: String },
    thumbnail: { type: String },
    price: { type: String },
    code: { type: String },
    stock: { type: Number }
})


export default class Products extends MongoDBContainer {
    constructor() {
        super(collection, productsSchema)
    }
}