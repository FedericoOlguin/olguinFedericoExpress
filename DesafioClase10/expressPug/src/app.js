import express from "express"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import __dirname from "./utils.js"




const app = express()
const PORT = 8080

app.use(express.static(__dirname + "/public"))
app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })
app.use(express.json())


app.set('views', __dirname + '/views');
app.set('view engine', 'pug')


app.use("/", viewsRouter)
app.use("/api/products", productsRouter)



