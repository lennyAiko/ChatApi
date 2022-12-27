import Admin from '../schemas/admin-schema.js'

export const modifyAdmin = (req, res) => {
    const key = req.params

    const data = req.body

    Admin.findOneAndUpdate({_id: key}, {...data}, {new: true})
        .then(data => {
            if (data) res.sendStatus(202)
        })
}