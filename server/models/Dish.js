const { Schema, model } = require('mongoose');

const dishSchema = new Schema(
    {
        dishName: {
            type: String,
            required: true,
        },
        dishPhoto: {
            type: String,
        },
        category: {
            type: String,
        }
    }
)

const Dish = model('Dish', dishSchema);

module.exports = Dish;