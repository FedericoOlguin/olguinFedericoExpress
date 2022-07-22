import express from "express"

import productsRouter from "./routes/productsRouter.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const PORT = 8080

app.listen(PORT, () => { console.log("Connected to PORT " + PORT); })
app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use("/api/products", productsRouter)


