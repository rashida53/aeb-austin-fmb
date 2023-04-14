const { Cook, Dish, MenuItem } = require('../models');
const Date = require('./graphql.js')

const resolvers = {

    Query: {
        cooks: async () => {
            return Cook.find();
        },
        dishes: async () => {
            return Dish.find();
        },
        menus: async () => {
            return MenuItem.find();
        }
    },

    Mutation: {
        addCook: async (parent, { fullName }) => {
            return Cook.create({ fullName });
        },
        addDish: async (parent, args) => {
            return Dish.create(args);
        },
        addMenu: async (parent, args) => {
            return MenuItem.create(args);
        }
    }
};

module.exports = resolvers;