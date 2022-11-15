import { Router } from "express";
import passport from "passport";
import config from "../config/config.js";
import UserController from "../controllers/UserController.js"
const { createUser, login, isCurrent } = UserController
import service from "../dao/configDao.js";
const router = Router()


router.post("/login", passport.authenticate("login", { session: false }), login)

router.post("/register", passport.authenticate("register", { session: false }), createUser)

router.get("/current", isCurrent)



export default router