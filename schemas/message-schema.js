import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    id: String,
    senderId: String,
    receiverId: String,
    Message: {type: Array, "default": []},
    status: {type: String, enum: ["Coffee", "Tea", "Water"]},
    date: {type: Date, default: Date.now}
})

const Message = mongoose.model("Message", messageSchema)

export default Message