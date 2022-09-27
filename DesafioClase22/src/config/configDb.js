import mongoose from "mongoose"


const conf = () => {

    mongoose.connect("falta url conexion", (err) => {
        if (err) console.log(err);
        else console.log("Connected Database");
    })
}


export default conf


