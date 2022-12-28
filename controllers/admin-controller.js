import Admin from '../schemas/admin-schema.js'

export const modifyAdmin = (req, res) => {
    const key = req.params

    const data = req.body

    try {
        Admin.findOneAndUpdate({_id: key}, {...data}, {new: true})
        .then(data => {
            if (data) res.sendStatus(202)
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
    
}

export const getApiKey = (req, res) => {

    const key = req.headers['x-access-token']

    try {
        Admin.find({key})
            .then(data => {
                if(data) res.status(200).send(data)
            })
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}