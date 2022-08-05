import ChatContenedor from "../contenedores/chatContenedor.js";
const chatC = new ChatContenedor()

const chatContoller = {

    getAllMesagges: async (req, res) => {
        let mesagges = await chatC.getAllProducts()
        return { status: 200, mesagges: mesagges }
    },
    addMesagge: async (req) => {
        let mesagge = req
        if (mesagge === undefined) return ({ status: 400, mesagge: "El producto no se envio correctamente" })
        if (mesagge.date === "" || mesagge.mesagge === "" || mesagge.user === "") return ({ status: 400, mesagge: "Error en el mensaje" })
        let saveMesagge = await chatC.saveMesagge(mesagge)
        return ({ status: 200, mesagge: "El producto se cargo correctamente", mesagges: [saveMesagge] })

    },
}

export default chatContoller