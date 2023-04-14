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

type MenuItem {
    _id: ID
    dish: String
    cook: String

}

type Query {
    cooks: [Cook]!
    dishes: [Dish]!
    menus: [MenuItem]!
}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
    addMenu(menuId: ID, dish: String, cook: String): MenuItem
}

`;

module.exports = typeDefs;