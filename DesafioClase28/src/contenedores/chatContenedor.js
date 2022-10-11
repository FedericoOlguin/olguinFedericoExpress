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
        let messages = await this.getAllProducts()
        try {
            if (messages.length === 0) {
                mesagge.id = 1
                messages.push(mesagge)
                await fs.promises.writeFile(path, JSON.stringify(messages, null, 2))
                return messages
            } else {
                mesagge.id = (messages[messages.length - 1].id + 1)
                messages.push(mesagge)
                await fs.promises.writeFile(path, JSON.stringify(messages, null, 2))
                return messages
            }
        } catch (err) {
            console.log("No se puede guardar el mensaje el archivos " + err);
        }
    }
}

export default ChatContenedor