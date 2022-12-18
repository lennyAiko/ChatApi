import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: {type: Array, "default": []},
    status: {type: String, enum: ["read", "unread"]},
    date: {type: Date, default: Date.now}
})

const Message = mongoose.model("Message", messageSchema)

export default Message