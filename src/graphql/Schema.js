// src/graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subscription {
    notificationAdded(userId: ID!): String
  }
  type Query {
    _empty: String
}
`;

module.exports = typeDefs;
