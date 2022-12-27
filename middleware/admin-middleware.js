import Admin from "../schemas/admin-schema.js"

export const checkAdmin = async (req, res, next) => {
    const admin = req.headers["x-access-token"]

    const result = await Admin.findOne({ token: admin })

    if(!result) return res.sendStatus(401)

    return next()
}