// src/graphql/resolvers.js
const userController = require('../app/Controllers/GraphqlController');
const { PubSub,withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await userController.getUserById(id);
    },
    getAllUsers: async () => {
      return await userController.getAllUsers();
    }
  },
  // Mutation: {
  //   createUser: async (_, { name, email, age }) => {
  //     const user = await userController.createUser(name, email, age);
  //     pubsub.publish('USER_CREATED', { userCreated: user });
  //     return user;
  //   }
  // },
  Subscription: {
    notificationAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('NOTIFICATION_ADDED'),
        (payload, variables) => {
          return payload.userId === variables.userId;
        }
      ),
    },
  },
  Query: {
    _empty: () => 'This is just a placeholder query',
  }
};

module.exports = resolvers;
