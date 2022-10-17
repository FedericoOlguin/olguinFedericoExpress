import knex from "knex"
import __dirname from "../utils.js"


const options = {
    client: "sqlite3",
    connection: {
        filename: __dirname + "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
let db = knex(options)

try {
    let existP = await db.schema.hasTable("products")
    let existC = await db.schema.hasTable("chat")
    if (!existP) {
        await db.schema.createTable("products", table => {
            table.primary("id"),
                table.increments("id"),
                table.string("title", 40),
                table.string("thumbnail", 500),
                table.integer("price")
        })
    }
    if (existC) {
        db("chat").del()
    } else {

        await db.schema.createTable("chat", table => {
            table.primary("id"),
                table.increments("id"),
                table.string("message", 500),
                table.string("user", 20),
                table.string("date", 40)
        })
    }
} catch (err) {
    console.log(err);
}


export default db