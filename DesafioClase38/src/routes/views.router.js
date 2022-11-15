import { Router } from "express";
import config from "../config/config.js";
import jwt from "jsonwebtoken"
const router = Router()

router.get("/", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})
router.get("/errorLogin", async (req, res) => {
    res.render("errLogin")
})

router.get("/registerFail", (req, res) => {
    res.render("errRegister")
})

router.get("/home", (req, res) => {
    const token = req.cookies[config.jwt.COOKIE]
    if (!token) return res.redirect("/")
    const user = jwt.verify(token, config.jwt.SECRET)
    res.render("home", { user })
})

router.get("/profile", (req, res) => {
    const token = req.cookies[config.jwt.COOKIE]
    if (!token) return res.redirect("/")
    const user = jwt.verify(token, config.jwt.SECRET)
    res.render("profile", { user })
})

export default router