import Friend from '../schemas/friends-schema.js'

export const getFriends = (req, res) => {
    Friend.find()
        .then((data, err) => {
            res.send(data)
        })
}

export const createFriend = (req, res) => {    
    console.log(req.body)
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
            res.send(data)
        })
}

export const friendList = (req, res) => {
    Friend.find({status: true})
        .then((data, err) => {
            res.send(data)
        })
}

export const getFriendDetails = (req, res) => {
    const { id } = req.params

    Friend.find({RequestSenderId: id})
        .then((data, err) => {
            res.send(data)
        })
}