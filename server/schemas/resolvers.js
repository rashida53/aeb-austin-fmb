const { Cook, Dish, Menu } = require('../models');
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
            return Menu.find();
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
            return Menu.create(args);
        }
    }
};

module.exports = resolvers;