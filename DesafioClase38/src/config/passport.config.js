import passport from "passport";
import local from "passport-local"
import service from "../dao/configDao.js";
const { userService } = service
import { createHash, isValidPassword } from "../util.js";
import cartController from "../controllers/CartController.js"

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email", session: false }, async (req, email, password, done) => {
        try {
            const { name, age, address, phoneNumber, imageUrl } = req.body
            const exist = await userService.findByEmail(email)
            if (exist) return done(null, false, { message: "User already exists" })
            let newUser = {
                name,
                age,
                address,
                phoneNumber,
                email,
                imageUrl,
                password: createHash(password)
            }
            let result = await userService.save(newUser)
            return done(null, result)
        } catch (err) {
            done(err)
        }

    }))

    passport.use("login", new LocalStrategy({ usernameField: "email", session: false }, async (email, password, done) => {
        try {
            const user = await userService.findByEmail(email)
            if (!user) return done(null, false, { message: "User not found" })
            if (!isValidPassword(user, password)) return done(null, false, { message: "Incorrect password" })
            return done(null, user)
        } catch (err) {
            done(err)
        }
    }))




    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let result = await userService.getById(id)
        return done(null, result);
    })
}

export default initializePassport