const { Cook, Dish, MenuItem, Signup, User } = require('../models');
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
        },
        signups: async () => {
            return Signup.find();
        }
    },

    Mutation: {
        addCook: async (parent, { fullName }) => {
            const cook = await Cook.create({ fullName });
            return cook;
        },
        addDish: async (parent, args) => {
            return Dish.create(args);
        },
        addMenu: async (parent, args) => {
            return MenuItem.create(args);
        },
        createSignup: async (parent, args) => {
            return Signup.create(args);
        },
        addUser: async (parent, args) => {
            return User.create(args);
        }
    }
};

module.exports = resolvers;