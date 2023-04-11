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

type Menu {
    _id: ID
    dishes: [Dish]
    cooks: [Cook]

}

input menuInput {
    menuId: ID
    dishes: String
    cooks: String
}

type Query {
    cooks: [Cook]!
    dishes: [Dish]!
    menus: [Menu]!
}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
    addMenu(input: menuInput): Menu
}

`;

module.exports = typeDefs;