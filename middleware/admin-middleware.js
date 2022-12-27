import Admin from "../schemas/admin-schema.js"

export const checkAdmin = async (req, res, next) => {
    const admin = req.headers["username"] || req.body.username

    const result = await Admin.findOne({ username: admin })

    if(!result) return res.sendStatus(401)

    return next()
}