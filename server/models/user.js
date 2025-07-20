import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model("user", userSchema)
export default User