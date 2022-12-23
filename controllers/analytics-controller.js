import Friend from "../schemas/friends-schema.js"
import Message from "../schemas/message-schema.js"
import User from "../schemas/user-schema.js"

// USER ANALYTICS

export const userTotalMessages = (req, res) => {
    
    const { userId } = req.params || req.headers['user-id']

    let count = 0

    User.find({ senderId: userId })
        .then((data, err) => {
            data.map(item => count += 1)
            res.status(200).send(String(count))
        })

}

export const userTotalFriends = (req, res) => {

    let count = 0

    Friend.find({ RequestReceiverId: req.headers['user-id'] })
        .then((data, err) => {
            data.map(item => {
                console.log(item)
                if (item.status === true) count += 1
            })
            res.status(200).send(String(count))
        })

}

// DEV ANALYTICS

export const totalUser = (req, res) => {

    User.find({ adminId: req.headers['apikey'] })
        .then(data => {
            res.status(200).send(String(data.length))
        })
}

export const totalMessages = (req, res) => {

    Message.find()
        .then(data => {
            res.status(200).send(String(data.length))
        })
}