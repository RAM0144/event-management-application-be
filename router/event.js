import express from "express";
import { eventModel } from "../db-utils/model.js";

const eventRouter = express.Router()

// const events = []

eventRouter.post("/", async (req, res) => {
    try {
        const userInfo = req.body; 

        const event = await eventModel({
            ...userInfo,
            id: Date.now().toString()
        })

        await event.save()
        res.status(201).send({msg: "Event created successfully"})

    } catch (error) {
        console.log("error", error);
        res.status(500).send({msg: "Internal Server Error", error})
    }
})


eventRouter.get("/events", async(req, res)=> {

    try {
        const events = await eventModel.find({}, {_id: 0, __v: 0 })
        res.send({msg: "Info about all the Events", events})
    } catch (error) {
        res.status(500).send({msg: "Internal Server Error", error})
    }
})

export default eventRouter