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