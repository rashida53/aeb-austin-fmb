const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const cookSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
    }
);

const Cook = model('Cook', cookSchema);

module.exports = Cook;