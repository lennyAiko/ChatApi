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

    const userToken = req.headers['x-access-token']

    console.log(userToken)
    
    console.log(req.file)

    console.log(req.body)

    if (req.file) {

        console.log('here')

        const data = req.body

        const image = req.file.path

        if (data.username) res.sendStatus(403)
        else {
            try {
                User.findOneAndUpdate({token: userToken}, {...data, image}, {new: true})
                .then(data => {
                    if (data) res.sendStatus(202)
                })
            } catch (err) {
                console.log(err)
                res.sendStatus(400)
            }
    }
    } else {

        console.log('here2')

        const data = req.body

        console.log(data)

        if (data.username) res.sendStatus(403)
        else {
            try {
                User.findOneAndUpdate({token: userToken}, {...data}, {new: true})
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