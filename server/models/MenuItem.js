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
        // date: {
        //     type: Date,
        //     required: true,
        // }
    }
)

const MenuItem = model('MenuItem', menuItemSchema);

module.exports = MenuItem;