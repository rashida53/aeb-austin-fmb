const { Schema, model } = require('mongoose');

const signupSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        menuItem: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        size: {
            type: String,
            required: true,
        },
    }
);

const Signup = model('Signup', signupSchema);

module.exports = Signup;