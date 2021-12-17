let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    // gender: {type: String, default: 'male'},
    phone: {type: Number, default:null},
    address: {type: String, default:null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    local: {
        email: {type: String, trim: true},
        password: String, 
        isActive: {type: Boolean, default:false},
        verifyToken: String
    },
    facebook: {
        uid: String, 
        token: String, 
        email: {type: String, trim: true}
    },
    google: {
        uid: String, 
        token: String, 
        email: {type: String, trim: true}
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null},
});

// trong statics viết các function thao tác với bảng contact
UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    existUser(username) {
        return this.findOne({"username": username}).exec();
    }
};
// tên bảng là user
module.exports = mongoose.model("user",UserSchema); 