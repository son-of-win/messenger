import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    sender: {
        id: String, 
        username: String, 
        avatar: String
    },
    receiver: {
        id: String, 
        username: String, 
        avatar: String
    },
    text: String,
    // contentType: phan biet loai file
    file: {data: Buffer, contentType: String, fileName: String},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default:null}
});

module.exports = mongoose.model("message", MessageSchema);