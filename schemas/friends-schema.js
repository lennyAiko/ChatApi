import mongoose from "mongoose"

const friendSchema = new mongoose.Schema({
    id: String,
    RequestSenderId: String,
    RequestReceiverId: String,
    status: Boolean,
    date: {type: Date, default: Date.now}
})

const Friend = mongoose.model("Friend", friendSchema)

export default Friend