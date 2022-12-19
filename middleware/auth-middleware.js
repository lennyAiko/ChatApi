import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()

const { TOKEN_KEY } = process.env

export const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.sendStatus(403)
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY)
        req.user = decoded
    } catch (err) {
        return res.sendStatus(401)
    }
    return next()
}