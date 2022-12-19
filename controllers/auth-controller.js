import User from "../schemas/user-schema.js"
import Admin from '../schemas/admin-schema.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

const {TOKEN_KEY} = process.env

export const userRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body

        const adminId = req.params

        if (!(username && firstName && lastName && email && password)) {
            res.sendStatus(400)
        }

        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.sendStatus(409)
        }

        let passwordEncrypt = await bcrypt.hash(password, 10)

        const user = User.create({
            username,
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNo,
            password: passwordEncrypt,
            adminId,
        })

        const token = jwt.sign(
            { user_id: user.id, email },
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const adminRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body

        const key = req.params

        if (!(username && firstName && lastName && email && password)) {
            res.sendStatus(400)
        }

        const oldUser = await Admin.findOne({ email })

        if (oldUser) {
            return res.sendStatus(409)
        }

        let passwordEncrypt = await bcrypt.hash(password, 10)

        const admin = Admin.create({
            username,
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNo,
            password: passwordEncrypt,
            adminId,
        })

        const token = jwt.sign(
            { admin_id: admin.id, email },
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        admin.token = token

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const userLogin = async (req, res) => {
    
    try {
        const { username, password } = req.body

        if(!(email && password)) {
            res.sendStatus(400)
        }

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.token = token

            res.sendStatus(200)
        }
        res.sendStatus(400)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        if(!(email && password)) {
            res.sendStatus(400)
        }

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.token = token

            res.sendStatus(200)
        }
        res.sendStatus(400)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}