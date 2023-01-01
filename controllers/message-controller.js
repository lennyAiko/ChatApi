import Message from '../schemas/message-schema.js'
import { encrypt, decrypt } from '../middleware/encryption-middleware.js'
import User from '../schemas/user-schema.js'

export const getReceiverMessage = async (req, res) => {
    const id = req.headers['x-access-token']

    const user = await User.findOne({token: id})

    Message.find({ receiverId: user.id })
        .then((data, err) => {
            const result = data.map(item => {
                const message = decrypt(item.message)
                return {
                    "id": item._id,
                    "senderId": item.senderId, 
                    "receiverId": item.receiverId,
                    "message": message,
                    "image": item.image,
                    "date": item.date
                }
            })
            res.send(result)
        })

}

export const getSenderMessage = async (req, res) => {
    const id = req.headers['x-access-token']

    const user = await User.findOne({token: id})
    
    Message.find({senderId: user.id})
        .then((data, err) => {
            const result = data.map(item => {
                const message = decrypt(item.message)
                return {
                    "id": item._id,
                    "senderId": item.senderId, 
                    "receiverId": item.receiverId,
                    "message": message,
                    "image": item.image,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

export const createMessage = async (req, res) => {

    const encryptMessage = encrypt(req.body.message)

    if (req.file) {
        Message.create({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: encryptMessage,
            image: req.file.path,
            status: req.body.status 
        }, (err, data) => { if (err) return err })
        res.sendStatus(200);
    } else {
        Message.create({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: encryptMessage,
            status: req.body.status 
        }, (err, data) => { if (err) return err })
        res.sendStatus(200);
    }
}

export const modifyMessage = (req, res) => {
    const { id } = req.params
    const { status } = req.body

    Message.findOneAndUpdate({_id: id}, {status: status}, {new: true})
        .then((data, err) => {
            if (!err) res.sendStatus(202)
        })

}

export const filterMessage = (req, res) => {

    const filterChoice = req.headers['choice']
    const filter = []

    Message.find({})
        .then((data, err) => {
            data.map((item) => { 
                if (item.status === filterChoice) {
                    item.message = decrypt(item.message)
                    filter.push(item) 
                } 
            })
            res.status(200).send(filter)
        })
}