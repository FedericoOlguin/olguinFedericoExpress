import mongoose from "mongoose";


const collection = "messages"


const messagesSchema = mongoose.Schema({
    author: {
        id: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: String },
        alias: { type: String },
        avatar: { type: String }
    },
    text: { type: String }
})


const Messages = mongoose.model(collection, messagesSchema)


export default Messages