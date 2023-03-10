import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

import User from "../schemas/user-schema.js"
import Admin from '../schemas/admin-schema.js'
import { encrypt, decrypt } from '../middleware/encryption-middleware.js'

dotenv.config()

const TOKENSESSION = "2h"

const {TOKEN_KEY} = process.env

// DEVs need to pass a defualt image

export const userRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body

        if (req.file) {
            const apiKey = req.headers["apikey"]

            const image = req.file.path

            if (!(username && firstName && lastName && email && password)) {
                res.sendStatus(400)
            }

            const oldUser = await User.findOne({ username })

            const encryptApiKey = encrypt(apiKey)

            const checkAdmin = await Admin.find({ encryptApiKey })

            if (!checkAdmin) {
                res.sendStatus(403)
            } else {
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
                    image,
                    adminId: encryptApiKey
                })
        
                const token = jwt.sign(
                    { user_id: user.id, username },
                    TOKEN_KEY,
                    {
                        expiresIn: TOKENSESSION
                    }
                )
        
                user.token = token

                user.save()
        
                const data = {
                    "id": user._id,
                    "username": user.username,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "phoneNo": user.phoneNo,
                    "image": user.image,
                    "token": user.token
                }

        
                res.status(201).json(data);
            }
        } else {
            const apiKey = req.headers["apikey"]

            if (!(username && firstName && lastName && email && password)) {
                res.sendStatus(400)
            }

            const oldUser = await User.findOne({ username })

            const encryptApiKey = encrypt(apiKey)

            const checkAdmin = await Admin.find({ encryptApiKey })

            if (!checkAdmin) {
                res.sendStatus(403)
            } else {
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
                    adminId: encryptApiKey
                })
        
                const token = jwt.sign(
                    { user_id: user.id, username },
                    TOKEN_KEY,
                    {
                        expiresIn: TOKENSESSION
                    }
                )
        
                user.token = token

                user.save()
        
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
        }

    } catch (err) {
        console.log(err)
        res.status(500).send("Invalid")
    }
}

export const adminRegister = async (req, res) => {
    
    try {

        const { username, firstName, lastName, email, phoneNo, password } = req.body
        
        if (req.file) {
            const image = req.file.path

            if (!(username && firstName && lastName && email && password)) {
                res.sendStatus(400)
            }

            const oldUser = await Admin.findOne({ username })

            if (oldUser) {
                return res.sendStatus(409)
            }

            let passwordEncrypt = await bcrypt.hash(password, 10)

            const userkey = uuidv4()

            let encryptApiKey = encrypt(userkey)

            const admin = await Admin.create({
                username,
                firstName,
                lastName,
                email: email.toLowerCase(),
                phoneNo: Number(phoneNo),
                image,
                password: passwordEncrypt,
                apiKey: encryptApiKey
            })

            const token = jwt.sign(
                { admin_id: admin.id, username },
                TOKEN_KEY,
                {
                    expiresIn: TOKENSESSION
                }
            )

            admin.token = token

            admin.save()

            const data = {
                "id": admin._id,
                "username": admin.username,
                "firstName": admin.firstName,
                "lastName": admin.lastName,
                "email": admin.email,
                "image": admin.image,
                "phoneNo": admin.phoneNo,
                "token": admin.token,
                "apikey": userkey
            }

            res.status(201).json(data);
        } else {
            if (!(username && firstName && lastName && email && password)) {
                res.sendStatus(400)
            }

            const oldUser = await Admin.findOne({ username })

            if (oldUser) {
                return res.sendStatus(409)
            }

            let passwordEncrypt = await bcrypt.hash(password, 10)

            let encryptApiKey = encrypt(uuidv4())

            const admin = await Admin.create({
                username,
                firstName,
                lastName,
                email: email.toLowerCase(),
                phoneNo: Number(phoneNo),
                password: passwordEncrypt,
                apiKey: encryptApiKey
            })

            const token = jwt.sign(
                { admin_id: admin.id, username },
                TOKEN_KEY,
                {
                    expiresIn: TOKENSESSION
                }
            )

            admin.token = token

            admin.save()

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
                    expiresIn: TOKENSESSION,
                }
            )

            user.token = token

            user.save()
            
            const data = {
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "phoneNo": user.phoneNo,
                "image": user.image,
                "token": user.token
            }
            res.status(201).json(data);
        } else {
            res.sendStatus(403)
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
                    expiresIn: TOKENSESSION,
                }
            )

            admin.token = token

            admin.save()

            const data = {
                "username": admin.username,
                "firstName": admin.firstName,
                "lastName": admin.lastName,
                "email": admin.email,
                "phoneNo": admin.phoneNo,
                "image": admin.image,
                "token": admin.token
            }

            res.status(201).json(data);
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}