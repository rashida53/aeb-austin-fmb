const { Cook } = require('../models');

const resolvers = {

    Query: {
        cooks: async () => {
            return Cook.find();
        }
    },
    Mutation: {
        addCook: async (parent, { fullName }) => {
            return Cook.create({ fullName });
        }
    }
};

module.exports = resolvers;