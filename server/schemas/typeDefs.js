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
    email: String!
}

type Auth {
    token: ID!
    me: User
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
    users: [User]!
    user(userId: ID!): User
    me: User
    userSignups: [Signup]!
    menuItem: MenuItem
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, fullName: String!): Auth
    addCook(cookId: ID, fullName: String): Cook
    addDish(dishId: ID, dishName: String, dishPhoto: String, category: String): Dish
    createMenu(menuId: ID, dish: String, cook: String, amount: Int, isPaid: Boolean menuDate: String): MenuItem
    addCost(menuId: ID, amount: Int): MenuItem
    createSignup(signupId: ID, user: String, menuItem: String, size: String): Signup
    menuPaid(menuId: ID, isPaid: Boolean): MenuItem
    returnToPending(menuId: ID): MenuItem
    deleteSignup(signupId: ID): Signup
}

`;

module.exports = typeDefs;