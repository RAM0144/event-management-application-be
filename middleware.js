import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).send({ msg: "No Token Provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        console.log("error", error)
        res.status(401).send({ msg: "Invalid token", error })
    }
}

export default verifyJWT