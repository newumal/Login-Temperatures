const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }

}, {
    timestamps: true
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel