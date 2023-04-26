const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Cook {
    _id: ID
    fullName: String!
}

type Dish {
    _id: ID
    dishName: String!
    dishPhoto: String
    category: String!
}

type MenuItem {
    _id: ID
    dish: Dish
    cook: Cook
}

type Signup {
    _id: ID
    user: User
    menuItem: MenuItem
    size: String!
}

type User {
    _id: ID
    fullName: String!
}

type Query {
    cooks: [Cook]!
    dishes: [Dish]!
    menus: [MenuItem]!
    signups: [Signup]!
}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
    createMenu(menuId: ID, dish: String, cook: String): MenuItem
    createSignup(signupId: ID, user: String, menuItem: String, size: String): Signup
    addUser(userId: ID, fullName: String): User
}

`;

module.exports = typeDefs;