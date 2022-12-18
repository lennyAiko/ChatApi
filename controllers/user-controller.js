import User from '../schemas/user-schema.js'

export const getUsers = (req, res) => {
    User.find()
        .then((data, err) => {
            const result = data.map(item => {return [
                item.username, item.firstName, 
                item.lastName, item.email, item.phoneNo
            ]}
            )
            res.send(result)
        })
}

export const createUser = (req, res) => {    
    const files = req.body
    User.create({
        username: files.username,
        firstName: files.firstName,
        lastName: files.lastName,
        email: files.email,
        phoneNo: files.phoneNo,
        password: files.password,
        adminId: files.adminId,
    }, (err, data) => { if (err) return handleError(err) })
    res.sendStatus(200);
}