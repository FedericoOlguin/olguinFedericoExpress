import mongoose from "mongoose"


const conf = () => {

    mongoose.connect("mongodb+srv://proyectoCoder:proyectoCoder@cluster0.6bm75ux.mongodb.net/normalizar?retryWrites=true&w=majority", (err) => {
        if (err) console.log(err);
        else console.log("Connected Database");
    })
}


export default conf


