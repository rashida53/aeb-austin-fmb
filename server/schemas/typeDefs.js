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
    category: String
}

type MenuItem {
    _id: ID
    dish: Dish
    cook: Cook
    amount: Int
    isPaid: Boolean
    menuDate: String
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
    cook(cookId: ID!): Cook!
    dishes: [Dish]!
    menus: [MenuItem]!
    openMenus: [MenuItem]!
    thisWeeksDishes: [MenuItem]!
    cookMenuItems(cookId: ID!): [MenuItem]!
    cookMenuItemsByDate(cookId: ID!): [MenuItem]!
    getCooksUnpaidMenus(cookId: ID!): [MenuItem]!
    getCooksPaidMenus(cookId: ID!): [MenuItem]!
    signups: [Signup]!

}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
    createMenu(menuId: ID, dish: String, cook: String, amount: Int, isPaid: Boolean menuDate: String): MenuItem
    addCost(menuId: ID, amount: Int): MenuItem
    createSignup(signupId: ID, user: String, menuItem: String, size: String): Signup
    addUser(userId: ID, fullName: String): User
    menuPaid(menuId: ID, isPaid: Boolean): MenuItem
    returnToPending(menuId: ID, isPaid: Boolean): MenuItem
}

`;

module.exports = typeDefs;