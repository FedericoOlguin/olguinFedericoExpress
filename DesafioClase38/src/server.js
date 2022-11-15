import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./util.js";
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/Sessions.router.js"
import mongoose from "mongoose"
import config from "./config/config.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import productRouter from "./routes/Products.router.js"



const app = express()
const PORT = process.env.PORT || 8080
mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@cluster0.6bm75ux.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`, (err) => {
    if (err) console.log(err)
    else console.log("Connected database")
})
app.use(cors())
app.use(express.static(__dirname + "/public"))
app.use(cookieParser())
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
initializePassport()
app.use(passport.initialize())


app.use("/", viewsRouter)
app.use("/api/session", sessionsRouter)
app.use("/api/products", productRouter)

const server = app.listen(PORT, () => console.log("Server listening on port: " + PORT))