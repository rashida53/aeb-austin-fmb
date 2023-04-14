const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;