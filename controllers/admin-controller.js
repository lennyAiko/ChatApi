import Admin from '../schemas/admin-schema.js'
import { decrypt } from '../middleware/encryption-middleware.js'

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
        Admin.findOne({token: key})
            .then(data => {
                if(data) {
                    const decryptKey = decrypt(data.apiKey)
                    res.status(200).send(decryptKey)
                }
            })
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}