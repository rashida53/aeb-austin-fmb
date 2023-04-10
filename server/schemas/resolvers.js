const { Cook, Dish } = require('../models');

const resolvers = {

    Query: {
        cooks: async () => {
            return Cook.find();
        },
        dishes: async () => {
            return Dish.find();
        }
    },
    
    Mutation: {
        addCook: async (parent, { fullName }) => {
            return Cook.create({ fullName });
        },
        addDish: async (parent, args) => {
            return Dish.create(args);
        }
    }
};

module.exports = resolvers;