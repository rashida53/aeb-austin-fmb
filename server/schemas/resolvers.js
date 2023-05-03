const { Cook, Dish, MenuItem, Signup, User, Category } = require('../models');

const resolvers = {

    Query: {
        cooks: async () => {
            return Cook.find();
        },
        cook: async (parent, { cookId }) => {
            return Cook.findOne(
                { _id: cookId }
            );
        },
        dishes: async () => {
            return Dish.find();
        },
        menus: async (parent, args) => {
            return MenuItem.find().populate('dish').populate('cook');
        },
        openMenus: async () => {
            var currentDate = new Date();
            var beforeThreeDays = new Date(currentDate.setDate(currentDate.getDate() - 3));
            return MenuItem.find(
                {
                    menuDate: { "$gte": beforeThreeDays }
                }
            ).populate('dish').populate('cook');
        },
        getCooksUnpaidMenus: async (parent, { cookId }) => {
            return MenuItem.find(
                {
                    cook: cookId,
                    isPaid: false
                }
            ).populate('dish').populate('cook');
        },
        getCooksPaidMenus: async (parent, { cookId }) => {
            return MenuItem.find(
                {
                    cook: cookId,
                    isPaid: true
                }
            ).populate('dish').populate('cook');
        },
        thisWeeksDishes: async () => {
            var currentDate = new Date();
            var beforeSevenDays = new Date(currentDate.setDate(currentDate.getDate() - 7));
            return MenuItem.find(
                {
                    menuDate: { "$gte": beforeSevenDays }
                }
            ).populate('dish').populate('cook');
        },
        cookMenuItemsByDate: async (parent, { cookId }) => {
            var currentDate = new Date();
            var beforeSevenDays = new Date(currentDate.setDate(currentDate.getDate() - 7));
            return MenuItem.find(
                {
                    cook: cookId,
                    menuDate: { "$gte": beforeSevenDays }
                }
            ).populate('dish').populate('cook');
        },
        cookMenuItems: async (parent, { cookId }) => {
            return MenuItem.find(
                {
                    cook: cookId
                }
            ).populate('dish').populate('cook');
        },
        signups: async () => {
            return Signup.find().populate(
                {
                    path: 'menuItem',
                    populate: { path: 'dish cook' },
                }
            ).populate('user');
        },
    },

    Mutation: {
        addCook: async (parent, { fullName }) => {
            const cook = await Cook.create({ fullName });
            return cook;
        },
        addDish: async (parent, args) => {
            return Dish.create(args);
        },
        createMenu: async (parent, args) => {
            return MenuItem.create(args);
        },
        createSignup: async (parent, args) => {
            return Signup.create(args);
        },
        addUser: async (parent, args) => {
            return User.create(args);
        },
        addCost: async (parent, { menuId, amount }) => {
            return MenuItem.findOneAndUpdate(
                { _id: menuId },
                {
                    amount: amount
                },
                { new: true }
            )
        },
        menuPaid: async (parent, { menuId, isPaid }) => {
            return MenuItem.findOneAndUpdate(
                { _id: menuId },
                {
                    isPaid: isPaid,
                },
                { new: true }
            )
        }
    }
};

module.exports = resolvers;
