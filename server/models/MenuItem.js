const { Schema, model } = require('mongoose');

const menuItemSchema = new Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        },
        cook: {
            type: Schema.Types.ObjectId,
            ref: 'Cook'
        },
        amount: {
            type: Number,
        },
        isPaid: {
            type: Boolean,
        },
        menuDate: {
            type: Date,
        }
    }
)

const MenuItem = model('MenuItem', menuItemSchema);

module.exports = MenuItem;