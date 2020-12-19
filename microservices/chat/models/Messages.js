const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    sender: {
        type: Number,
        trim: true
    },
    reciver: {
        type: Number,
        trim: true
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const messageModel = mongoose.model('message', messageSchema)
module.exports = messageModel