import User from "../schemas/user-schema.js"

export const checkUser = async (req, res, next) => {
    const user = req.headers["x-access-token"]

    const result = await User.find({ token: user })
    
    if(result.length<1 || !result) res.sendStatus(401)

    return next()
}