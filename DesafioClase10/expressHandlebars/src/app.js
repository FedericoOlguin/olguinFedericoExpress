import express from "express"
import productsRouter from "./routes/productsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import __dirname from "./utils.js"
import handlebars from 'express-handlebars';



const app = express()
const PORT = 8080

app.use(express.static(__dirname + "/public"))
app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')


app.use("/", viewsRouter)
app.use("/api/products", productsRouter)



