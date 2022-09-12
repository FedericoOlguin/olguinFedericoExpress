import ChatContenedor from "../contenedores/chatContenedor.js";
// import db from "../optionsDb/SQLite3.js";
import Messages from "../models/messages.js";
import { normalize, schema, denormalize } from "normalizr"
const chatC = new ChatContenedor()


const author = new schema.Entity("autores")
const message = new schema.Entity("mensajes", {
    author: author
})
const mensajeSchama = new schema.Entity("chat", {
    messages: [message]
})

const chatContoller = {

    getAllmessages: async (req, res) => {
        // let messages = await chatC.getAllProducts()
        // let messages = await  db("chat").select("*")
        let messagesRes = await Messages.find({}, { author: 1, text: 1 })
        let me = messagesRes.map((obj) => {
            return {
                id: (obj._id).toString(),
                author: obj.author,
                text: obj.text
            }
        })
        let normMessages = {
            id: "messages",
            messages: me
        }
        const normalizeMessage = normalize(normMessages, mensajeSchama)
        console.log(JSON.stringify(normalizeMessage, null, "\t"));
        const denormalizedMessage = denormalize(normalizeMessage.result, mensajeSchama, normalizeMessage.entities)
        console.log(JSON.stringify(denormalizedMessage, null, "\t"));
        return { status: 200, messages: messagesRes, normalizeMessage: normalizeMessage, denormalizedMessage: denormalizedMessage }
    },
    // getAllmessages: async (req, res) => {
    //     let messages = await chatC.getAllProducts()
    //     return { status: 200, messages: messages }
    // },
    addMessage: async (req) => {
        let message = req
        if (message === undefined) return ({ status: 400, message: "El producto no se envio correctamente" })
        if (message.date === "" || message.message === "" || message.user === "") return ({ status: 400, message: "Error en el mensaje" })
        // let savemessage = await chatC.savemessage(message)
        // let savemessage = await db("chat").insert(message)
        let savemessage = await Messages.create(message)
        return ({ status: 200, message: "El producto se cargo correctamente", messages: [savemessage] })

    },
}

export default chatContoller