import express from "express"
import { vendorModel } from "../db-utils/model.js";

const vendorRouter = express.Router()

vendorRouter.get("/vendors", async (req, res) => {
    try {
        const vendors = await vendorModel.find({}, {_id: 0, __v: 0 })
        res.send({msg: "Info about vendors", vendors})
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ msg: "Internal Server Error", error });
    }
})

vendorRouter.post("/", async(req, res) => {
    try {
        const vendorData = req.body;
        const vendor = await vendorModel({
            ...vendorData,
            id: Date.now().toString()
        })
        await vendor.save()
        res.status(201).send({msg: "Vendor Created Successfully"})
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ msg: "Internal Server Error", error });
    }
})

export default vendorRouter