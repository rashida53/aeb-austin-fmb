const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Cook {
    _id: ID
    fullName: String
}

type Query {
    cooks: [Cook]!
}

type Mutation {
    addCook(cookId: ID, fullName: String): Cook
}
`;

module.exports = typeDefs;