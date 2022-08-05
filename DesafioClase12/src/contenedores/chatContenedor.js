import fs from "fs"
import __dirname from "../utils.js"


const path = __dirname + "/files/chat.json"


class ChatContenedor {
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

    saveMesagge = async (mesagge) => {
        let mesagges = await this.getAllProducts()
        try {
            if (mesagges.length === 0) {
                mesagge.id = 1
                mesagges.push(mesagge)
                await fs.promises.writeFile(path, JSON.stringify(mesagges, null, 2))
                return mesagges
            } else {
                mesagge.id = (mesagges[mesagges.length - 1].id + 1)
                mesagges.push(mesagge)
                await fs.promises.writeFile(path, JSON.stringify(mesagges, null, 2))
                return mesagges
            }
        } catch (err) {
            console.log("No se puede guardar el mensaje el archivos " + err);
        }
    }
}

export default ChatContenedor