import User from "../schemas/user-schema.js"
import Admin from '../schemas/admin-schema.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

import jwt from "jsonwebtoken"

dotenv.config()

const {TOKEN_KEY} = process.env

export const userRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body

        const adminId = req.user.adminId

        const key = req.params

        if (!(username && firstName && lastName && email && password)) {
            res.sendStatus(400)
        }

        const oldUser = await User.findOne({ username })

        const checkAdmin = await Admin.findOne({ key })

        if (!checkAdmin) {
            res.sendStatus(403)
        }

        if (oldUser) {
            return res.sendStatus(409)
        }

        let passwordEncrypt = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNo,
            password: passwordEncrypt,
            adminId
        })

        const token = jwt.sign(
            { user_id: user.id, username },
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token

        const data = {
            "username": user.username,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "phoneNo": user.phoneNo,
            "token": user.token
        }

        res.status(201).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).send("Invalid")
    }
}

export const adminRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body

        if (!(username && firstName && lastName && email && password)) {
            res.sendStatus(400)
        }

        const oldUser = await Admin.findOne({ username })

        if (oldUser) {
            return res.sendStatus(409)
        }

        let passwordEncrypt = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            username,
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNo: Number(phoneNo),
            password: passwordEncrypt,
            apiKey: uuidv4()
        })

        const token = jwt.sign(
            { admin_id: admin.id, username },
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        admin.token = token

        const data = {
            "username": admin.username,
            "firstName": admin.firstName,
            "lastName": admin.lastName,
            "email": admin.email,
            "phoneNo": admin.phoneNo,
            "token": admin.token
        }

        res.status(201).json(data);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const userLogin = async (req, res) => {
    
    try {
        const { username, password } = req.body

        if(!(username && password)) {
            res.sendStatus(400)
        }

        const user = await User.findOne({ username })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, username },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.token = token
            
            const data = {
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "phoneNo": user.phoneNo,
                "token": user.token
            }

            res.status(201).json(data);
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        if(!(username && password)) {
            res.sendStatus(400)
        }

        const admin = await Admin.findOne({ username })

        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign(
                { admin_id: admin._id, username },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            admin.token = token

            const data = {
                "username": admin.username,
                "firstName": admin.firstName,
                "lastName": admin.lastName,
                "email": admin.email,
                "phoneNo": admin.phoneNo,
                "token": admin.token
            }

            res.status(201).json(data);
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const getToken = (req, res, next) => {

    console.log(req.user)
    next()
}