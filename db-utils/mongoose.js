import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()


const dbName = process.env.DB_NAME || "event-app"
const dbUsr = process.env.DB_USERNAME ||""
const dbPassword = process.env.DB_PASSWORD || ""
const dbCluster = process.env.DB_CLUSTER || ""

// create instance

const cloudurl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`


//connect to db

const connectToDB =async () => {
    try {
      await mongoose.connect(cloudurl)
      console.log("Mongoose Connected Successfully")  
    } catch (e) {
        console.log("Error connecting to db", e)
        process.exit(1)
    }
}


export default connectToDB;