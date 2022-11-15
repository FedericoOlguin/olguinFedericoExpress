import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";


const collection = "users"

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phoneNumber: String,
    age: Number,
    address: String,
    imageUrl: String,
    rol: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})



export default class User extends MongoDBContainer {
    constructor() {
        super(collection, userSchema)
    }

    findByEmail = async (email) => {
        let res = await this.model.findOne({ email: email })
        return res
    }
}
