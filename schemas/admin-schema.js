import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: Number,
    password: String,
    apiKey: String,
    token: String,
    date: {type: Date, default: Date.now}
})

const Admin = mongoose.model("Admin", adminSchema)

export default Admin