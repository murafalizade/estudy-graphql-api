// import { IParent } from "../interfacetypes";
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
const notificationSub = {
  Subscription: {
    notifications: {
      subscribe: () => pubsub.asyncIterator(['sad']),
    },
  },
};

export default notificationSub;
