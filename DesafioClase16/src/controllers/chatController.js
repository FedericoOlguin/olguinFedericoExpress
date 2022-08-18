import ChatContenedor from "../contenedores/chatContenedor.js";
import db from "../optionsDb/SQLite3.js";
const chatC = new ChatContenedor()

const chatContoller = {

    getAllmessages: async (req, res) => {
        // let messages = await chatC.getAllProducts()
        let messages = await await db("chat").select("*")
        return { status: 200, messages: messages }
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
        let savemessage = await db("chat").insert(message)
        return ({ status: 200, message: "El producto se cargo correctamente", messages: [savemessage] })

    },
}

export default chatContoller