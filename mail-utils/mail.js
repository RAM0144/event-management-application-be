import nodemailer from "nodemailer";

import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "test994401@gmail.com",
        pass: process.env.GMAIL_PASSWORD || "", 
    }
})

const mailOption = {
    from: "test994401@gmail.com",
    to: [],
    subject: "Hey!! Welcome to the Application!!",
    text: "Welcome to the Event Management Application",
}

export { mailOption, transporter }