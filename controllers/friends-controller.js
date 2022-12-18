import Friend from '../schemas/friends-schema.js'
import User from '../schemas/user-schema.js'

export const getFriends = (req, res) => {
    Friend.find()
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "RequestSenderId": item.RequestSenderId, 
                    "RequestReceiverId": item.RequestReceiverId,
                    "status": item.status,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

export const createFriend = (req, res) => {    
    Friend.create({
        RequestSenderId: req.body.RequestSenderId,
        RequestReceiverId: req.body.RequestReceiverId,
        status: req.body.status
    }, (err, data) => { if (err) return handleError(err) })
    res.sendStatus(200);
}

export const friendRequest = (req, res) => {
    Friend.find({status: false})
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "RequestSenderId": item.RequestSenderId, 
                    "RequestReceiverId": item.RequestReceiverId,
                    "status": item.status,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

export const friendList = (req, res) => {
    Friend.find({status: true})
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "RequestSenderId": item.RequestSenderId, 
                    "RequestReceiverId": item.RequestReceiverId,
                    "status": item.status,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

// search for user then show the details of the user
export const getFriendDetails = (req, res) => {
    const { id } = req.params

    Friend.find({RequestSenderId: id})
        .then((data, err) => {
            res.send(data)
        })
}