import Friend from "../schemas/friends-schema.js"
import User from "../schemas/user-schema.js"

// USER ANALYTICS

export const totalMessages = (req, res) => {
    
    const { userId } = req.params || req.headers['user-id']

    let count = 0

    User.find({ senderId: userId })
        .then((data, err) => {
            data.map(item => count += 1)
            res.status(200).send(String(count))
        })

}

export const totalFriends = (req, res) => {

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
    
    let count = 0

    User.find({ adminId: req.headers['user-id'] })
        .then(data => {
            data.map(item => count+=1)
            res.status(200).send(String(count))
        })
}