import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: Number,
    password: String,
    apiKey: String,
    date: {type: Date, default: Date.now}
})

const Admin = mongoose.model("Admin", adminSchema)

export default Admin