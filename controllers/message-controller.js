import Message from '../schemas/message-schema.js'
import { encrypt, decrypt } from '../middleware/encryption-middleware.js'

export const getReceiverMessage = (req, res) => {
    const id = req.headers['receiver']
    Message.find({ receiverId: id })
        .then((data, err) => {
            const result = data.map(item => {
                const message = decrypt(item.message)
                return {
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

export const getSenderMessage = (req, res) => {
    const id = req.headers['sender']
    Message.find({senderId: id})
        .then((data, err) => {
            const result = data.map(item => {
                const message = decrypt(item.message)
                return {
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

    const filterChoice = req.params
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