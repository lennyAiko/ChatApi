import User from "../schemas/user-schema.js"

// USER ANALYTICS

export const totalMessages = (req, res, next) => {
    
    const { userId } = req.params || req.headers['user-id']

    User.find({ senderId: userId })
        .then((data, err) => {
            res.status(200).send(data)
        })
}
// DEV ANALYTICS
