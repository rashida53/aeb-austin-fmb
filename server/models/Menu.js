const { Schema, model } = require('mongoose');

const menuSchema = new Schema(
    {
        dishes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }],
        cooks: [{
            type: Schema.Types.ObjectId,
            ref: 'Cook'
        }],
        // date: {
        //     type: Date,
        //     required: true,
        // }
    }
)

const Menu = model('Menu', menuSchema);

module.exports = Menu;