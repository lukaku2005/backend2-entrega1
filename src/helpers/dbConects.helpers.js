import { connect } from "mongoose";

const dbConnect = async(url) => {
    try{
        await connect(url)
        console.log("conectado a la base de datos de mongo")
    } catch(error){
        console.log(error)
    }
}

export default dbConnect