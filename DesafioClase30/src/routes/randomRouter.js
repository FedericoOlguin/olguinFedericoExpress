import { Router } from "express";
import { fork } from "child_process"
import __dirname from "../utils.js";
const router = Router()



router.get("/", (req, res) => {
    // console.log(req.query.cant);
    const cant = req.query.cant
    const child = fork(__dirname + "/config/calculoRandoms.js")
    child.send(cant + "")
    child.on("message", val => {
        res.json({ response: val })
    })
})


export default router