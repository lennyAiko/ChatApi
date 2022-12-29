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

export const friendRequest = async (req, res) => {

    const userToken = req.headers['x-access-token']

    const user = await User.findOne({token: userToken})

    Friend.find({status: false})
        .then((data, err) => {
            const result = data.map(item => {
                if (item.RequestReceiverId == user._id.toHexString()) {
                    return {
                        "RequestSenderId": item.RequestSenderId, 
                        "RequestReceiverId": item.RequestReceiverId,
                        "status": item.status,
                        "date": item.date
                    }
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

    User.findOne({_id: id})
        .then((data, err) => {
            const result = {
                "username": data.username,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "phoneNo": data.phoneNo,
                "image": data.image
            }
            res.send(result)
        })
}

export const searchFriend = (req, res) => {
    const key = req.params

    User.find({ key })
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "username": item.username,
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "email": item.email,
                    "phoneNo": item.phoneNo,
                    "image": item.image
                }
            })
            res.send(result)
        })
}