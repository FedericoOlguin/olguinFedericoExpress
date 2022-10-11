import passport from "passport"
import local from "passport-local"
import GithubStraregy from "passport-github2"
import User from "../models/user.js"
import { createHash, isValidPassword } from "../utils.js"
const LocalStrategy = local.Strategy



const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
        const { name } = req.body
        try {
            if (!email || !password || !name) return done(null, false, { message: "Datos inconpletos" })
            const exist = await User.findOne({ email: email })
            if (exist) return done(null, false, { messasge: "El usuario ya existe" })
            let saveUser = {
                email,
                name,
                password: createHash(password)
            }
            const response = await User.create(saveUser)
            return done(null, response)
        } catch (err) {
            console.log(err);
            done(err)
        }
    }))

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Datos incompletos" })
        const exist = await User.findOne({ email: email })
        if (!exist) return done(null, false, { message: "Incorrect credentials" })
        if (isValidPassword(exist, password)) {
            return done(null, exist)
        } else {
            done(null, false, { message: "Incorrect password" })
        }
    }))

    passport.use("github", new GithubStraregy({
        clientID: "Iv1.08782e770d88473c",
        clientSecret: "9d28e62e0f1fd27e824b3c784a6af1a4118ef59a",
        callbackURL: "http://localhost:8080/api/session/githubCallback"
    }, async (accessToken, refreshToken, profile, done) => {
        const { name, email, } = profile._json
        // console.log(profile);
        // console.log(name);
        // console.log(email);
        let user = await User.findOne({ email: email })
        if (!user) {
            let newUser = {
                name,
                email,
                password: ""
            }
            let result = await User.create(newUser)
            return done(null, result)
        } else {
            return done(null, user)
        }

        return done(null, false)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await User.findOne({ _id: id })
        return done(null, result)
    })
}

export default initializePassport