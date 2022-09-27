import express from "express"
import db from "./optionsDb/SQLite3.js"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import __dirname from "./utils.js"
import handlebars from 'express-handlebars';
import { Server } from "socket.io"
import productsController from "./controllers/productsController.js";
import chatContoller from "./controllers/chatController.js"
import configDb from "./config/configDb.js"
import sessionRouter from "./routes/sessionRouter.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import initializePassport from "./config/passport.config.js"
import passport from "passport"

configDb()

let log = []
chatContoller.getAllmessages().then(res => log = res)


const app = express()
const PORT = 8080
app.use(express.static(__dirname + "/public"))
const server = app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })
const io = new Server(server)
app.use(express.json())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://proyectoCoder:proyectoCoder@cluster0.6bm75ux.mongodb.net/normalizar?retryWrites=true&w=majority",
        ttl: 60
    }),
    secret: "clave3000",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views/partials', __dirname + '/views/partials');
app.set('view engine', 'handlebars')


app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/session", sessionRouter)

app.get("/messages", async (req, res) => {
    let pes = await chatContoller.getAllmessages()
    // console.log(pes.messages);
    let mes = await db("chat").insert(pes.messages)
    // console.log(mes);
    res.json({ status: 200, messages: mes })
})

app.get("/message", async (req, res) => {

    let mes = await db("chat").select("*")
    // console.log(mes);
    res.json({ status: 200, messages: mes })
})

io.on("connection", socket => {
    // console.log("hola estoy conectado  con websocket");
    socket.on("addProduct", async data => {
        let res = await productsController.addProduct(data)
        io.emit("listProduct", { ...res.products })

    })
    prod()

    socket.on("message", async data => {
        log.messages.push(data)
        chatContoller.addMessage(data)
        io.emit("log", log.messages)
    })


    socket.broadcast.emit('newConnection');
})

let prod = async () => {
    let res = await productsController.getAllProducts()
    io.emit("listProduct", { ...res })
}




