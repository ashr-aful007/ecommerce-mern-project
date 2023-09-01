const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const {defaultImagePath} = require("../secret/defaultImagePath")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [3, 'The length of user name should be at least 3 characters'],
        maxlength: [31, 'User name length can be maximum 31 characters']
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        unique: true, // Ensure email is unique
        validate: {
            validator: function (v){
                // A simple regex for email validation
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Please enter a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'The length of password should be at least 8 characters'],
        set: (v) =>bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        default: defaultImagePath,
        
    },
    address: {
        type: String,
        required: [true, 'User addrs is required'],
    },
    phone: {
        type: String,
        required: [true, 'User addrs is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
},{timestamps: true});



const User = model('User', userSchema);

module.exports = User;
