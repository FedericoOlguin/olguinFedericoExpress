import mongoose from "mongoose"


const conf = () => {

    mongoose.connect("falta Url de conexion", (err) => {
        if (err) console.log(err);
        else console.log("Connected Database");
    })
}


export default conf


