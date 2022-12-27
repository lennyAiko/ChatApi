import User from '../schemas/user-schema.js'

export const getUsers = (req, res) => {
    User.find()
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "username": item.username, 
                    "firstName": item.firstName, 
                    "lastName": item.lastName, 
                    "email": item.email, 
                    "phoneNo": item.phoneNo
                }
            })
            res.send(result)
        })
}

export const searchUser = (req, res) => {
    const key = req.params

    User.find({ key })
        .then((data, err) => {
            const result = data.map(item => {
                return {
                    "username": item.username, 
                    "firstName": item.firstName, 
                    "lastName": item.lastName, 
                    "email": item.email, 
                    "phoneNo": item.phoneNo
                }
            })
            res.send(result)
        })
}

export const modifyUser = (req, res) => {
    const key = req.params

    const data = req.body

    User.findOneAndUpdate({_id: key}, {...data}, {new: true})
        .then(data => {
            if (data) res.sendStatus(202)
        })
}