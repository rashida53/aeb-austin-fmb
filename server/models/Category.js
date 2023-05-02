const { Schema, model } = require('mongoose');

const categorySchema = newSchema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }
    }
);

const Category = model('Category', categorySchema);
module.exports = Category;