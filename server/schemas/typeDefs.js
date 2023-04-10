const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Cook {
    _id: ID
    fullName: String!
}

type Dish {
    _id: ID
    dishName: String!
    dishPhoto: String!
    category: String!
}

type Query {
    cooks: [Cook]!
    dishes: [Dish]!
}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
}
`;

module.exports = typeDefs;