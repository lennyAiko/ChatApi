import User from "../schemas/user-schema.js"

export const checkUser = async (req, res, next) => {
    const user = req.headers["username"] || req.body.username

    const result = await User.find({ username: user })
    
    if(!result) res.sendStatus(401)

    return next()
}