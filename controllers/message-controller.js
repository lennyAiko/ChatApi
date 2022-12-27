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
                    "image": item.image,
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
                    "image": item.image,
                    "date": item.date
                }
            })
            res.send(result)
        })
}

export const createMessage = (req, res) => {

    if (req.file.path) {
        Message.create({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: req.body.message,
            image: req.file.path,
            status: req.body.status 
        }, (err, data) => { if (err) return handleError(err) })
        res.sendStatus(200);
    } else {
        Message.create({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: req.body.message,
            status: req.body.status 
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

export const filterMessage = (req, res) => {

    const filterChoice = req.headers['choice']
    const filter = []

    Message.find({})
        .then((data, err) => {
            data.map((item) => { if (item.status === filterChoice) { filter.push(item) } })
            res.status(200).send(filter)
        })
}