import { Router } from "express";
import User from "../models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";


const router = Router()



router.post("/login", passport.authenticate("login", { failureRedirect: "/api/session/loginFail" }), async (req, res) => {

    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        _id: req.user._id
    }
    res.json({
        message: "logeado",
        success: true,
        payload: req.session.user
    })

})
router.get("/loginFail", async (req, res) => {
    // res.redirect("http://localhost:8080/login/errorLogin")
    res.json({
        message: "Error al intentar login",
        success: false,
        payload: req.session.user
    })
})
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/session/registerFail" }), async (req, res) => {
    try {
        res.json({
            success: true,
            payload: req.user._id
        })
    } catch (err) {
        console.log(err);
    }
})
router.get("/registerFail", (req, res) => {
    res.json({
        success: false,
        mnessage: "Error",
        status: 500
    })
})

export default router