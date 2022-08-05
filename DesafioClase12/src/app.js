import express from "express"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import __dirname from "./utils.js"
import handlebars from 'express-handlebars';
import { Server } from "socket.io"
import productsController from "./controllers/productsController.js";
import chatContoller from "./controllers/chatController.js"
let log = []
chatContoller.getAllMesagges().then(res => log = res)


const app = express()
const PORT = 8080
app.use(express.static(__dirname + "/public"))
const server = app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })
const io = new Server(server)
app.use(express.json())



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views/partials', __dirname + '/views/partials');
app.set('view engine', 'handlebars')


app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
io.on("connection", socket => {
    // console.log("hola estoy conectado  con websocket");
    socket.on("addProduct", async data => {
        let res = await productsController.addProduct(data)
        io.emit("listProduct", { ...res.products })

    })
    prod()

    socket.on("mesagge", async data => {
        log.mesagges.push(data)
        chatContoller.addMesagge(data)
        io.emit("log", log.mesagges)
    })


    // socket.broadcast.emit('newConnection');
})

let prod = async () => {
    let res = await productsController.getAllProducts()
    io.emit("listProduct", { ...res })
}


