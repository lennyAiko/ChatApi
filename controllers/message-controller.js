import Message from '../schemas/message-schema.js'

export const getReceiverMessage = (req, res) => {
    const { id } = req.params
    Message.find({receiverId: id})
        .then((data, err) => {
            res.send(data)
        })
}

export const getSenderMessage = (req, res) => {
    const { id } = req.params
    Message.find({senderId: id})
        .then((data, err) => {
            res.send(data)
        })
}

export const createMessage = (req, res) => {
    const files = req.body

    if (files.message[1]) {
        Message.create({
            senderId: files.senderId,
            receiverId: files.receiverId,
            message: files.message,
            status: files.status
        }, (err, data) => { if (err) return handleError(err) })
        res.sendStatus(200);
    } else {
        Message.create({
            senderId: files.senderId,
            receiverId: files.receiverId,
            message: files.message[0],
            status: files.status
        }, (err, data) => { if (err) return handleError(err) })
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