import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { userModel } from "../db-utils/model.js";
import { transporter, mailOption } from "../mail-utils/mail.js";


const authRouter = express.Router()

authRouter.post("/register", async(req, res) => {

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const userId = Date.now().toString()

        const newUser = new userModel({ username, email, userId, 
            password: hashedPassword });
        await newUser.save();
        
        res.status(201).send({ msg: "User registered successfully" });
     
        await transporter.sendMail({
            ...mailOption,
            to: [newUser.email]
        })

    } catch (e) {
        console.log("error", e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

authRouter.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).send({msg: "User Not Found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(!isPasswordValid){
            return res.status(400).send({msg: "invalid user details"})
        }

        const userObj = user.toObject();

        delete userObj.password
       
        const authToken = jwt.sign(userObj, process.env.JWT_SECRET, 
            {expiresIn: process.env.EXPIRY_TIME} )

       res.send({msg: "Login Successfully", userToken: authToken})

    } catch (error) {
        console.log("error", error)
        res.status(500).send({msg: "Internal Server Error"}) 
    }
})

export default authRouter