import mongoose from "mongoose";

const connection = {}

async function dbConnect(){
    if (connection.isConnected) {
        console.log("Already connected to the databse")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "", {});
        connection.isConnected= db.connections[0].readyState
    } catch (error) {
        console.log("Error while connecting the db", error)
        process.exit(1)
    }
}

export default dbConnect;
