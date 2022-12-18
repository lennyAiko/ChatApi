import Message from '../schemas/message-schema.js'

export const getReceiverMessage = (req, res) => {
    const { id } = req.params
    Message.find({receiverId: id})
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "senderId": item.senderId, 
                    "receiverId": item.receiverId,
                    "message": item.message,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

export const getSenderMessage = (req, res) => {
    const { id } = req.params
    Message.find({senderId: id})
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "senderId": item.senderId, 
                    "receiverId": item.receiverId,
                    "message": item.message,
                    "date": item.date
                }
            })
            res.send(result)
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