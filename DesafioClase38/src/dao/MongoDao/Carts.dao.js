import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";


const collection = "carts"
let time = Date.now()
const cartSchema = mongoose.Schema({
    timestamp: { type: Number, default: Date.now() },
    products: { type: Array, default: [] }
})


export default class Cart extends MongoDBContainer {

    constructor() {
        super(collection, cartSchema)
    }

}