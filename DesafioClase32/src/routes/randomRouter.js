import { Router } from "express";
import { fork } from "child_process"
import __dirname from "../utils.js";
import pino from "pino"
const streams = [
    { level: "info", stream: process.stdout },
    { level: "warn", stream: pino.destination("./pinoErrors.log") }
]

const logger = pino({}, pino.multistream(streams))
const router = Router()



// router.get("/", (req, res) => {
//     console.log(req.query.cant);
//     const cant = req.query.cant
//     const child = fork(__dirname + "/config/calculoRandoms.js")
//     child.send(cant + "")
//     child.on("message", val => {
//         res.json({ response: val })
//     })
// })
router.get("/", (req, res) => {
    try {
        const cant = req.query.cant || 1e8
        logger.info("Test de logger con info")
        const element = {}
        let array = []
        for (let index = 0; index < cant; index++) {
            array.push(Math.floor(Math.random() * 1000 + 1))
        }
        let ordenado = array.sort()
        let contador = 0
        for (let i = 0; i < ordenado.length; i++) {
            if (ordenado[i + 1] === ordenado[i]) {
                contador++
            } else if (contador !== 0) {
                element[ordenado[i]] = contador
                contador = 0
            } else {
                element[ordenado[i]] = 1
            }
        }

        res.json({ response: element })

    } catch (error) {
        logger.error(error, "Error en random")
    }
})


export default router