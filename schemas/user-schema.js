import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: Number,
    password: String,
    image: String,
    adminId: String,
    token: String,
    date: {type: Date, default: Date.now}
})

const User = mongoose.model("User", userSchema)

export default User