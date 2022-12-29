import Admin from '../schemas/admin-schema.js'
import { decrypt } from '../middleware/encryption-middleware.js'

export const modifyAdmin = (req, res) => {
    const adminToken = req.headers['x-access-token']

    if (req.file) {
        const data = req.body

        const image = req.file.path

        if (data.username) res.sendStatus(403)
        else {
            try {
                Admin.findOneAndUpdate({token: adminToken}, {...data, image}, {new: true})
                .then(data => {
                    if (data) res.sendStatus(202)
                })
            } catch (err) {
                console.log(err)
                res.sendStatus(400)
            }
        }
    } else {
        const data = req.body

        if (data.username) res.sendStatus(403)
        else {
            try {
                Admin.findOneAndUpdate({token: adminToken}, {...data}, {new: true})
                .then(data => {
                    if (data) res.sendStatus(202)
                })
            } catch (err) {
                console.log(err)
                res.sendStatus(400)
            }
        }
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