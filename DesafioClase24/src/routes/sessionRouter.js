import { Router } from "express";
import User from "../models/user.js";


const router = Router()



router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ success: false, message: "Datos incompletos" })
    const exist = await User.findOne({ email: email })
    if (exist.password === password) {
        req.session.user = {
            name: exist.name,
            email,
        }
        res.json({
            message: "logeado",
            success: true,
        })
    } else {
        res.json({
            message: "Datos no validos",
            success: false
        })
    }
})

export default router