import express from "express"
import connectToDB from "./db-utils/mongoose.js"
import dotenv from "dotenv"
import authRouter from "./router/auth.js"
import cors from "cors"
import eventRouter from "./router/event.js"
import vendorRouter from "./router/vendor.js"
import bookingRouter from "./router/booking.js"
import verifyJWT from "./middleware.js"

const server = express()

server.use(express.json())

server.use(cors())

dotenv.config()

await connectToDB()


server.use("/auth", authRouter)

server.use("/events",verifyJWT, eventRouter)
server.use("/vendors",verifyJWT, vendorRouter)
server.use("/bookings",verifyJWT, bookingRouter);

const port = 4800

server.listen(port, ()=>{
    console.log(Date().toString(), `server is running on:${port}`)
})