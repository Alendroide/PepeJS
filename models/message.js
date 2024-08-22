const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    }
},{timestamps:true});

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;