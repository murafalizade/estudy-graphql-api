import Mutation from './mutations';
import Query from './queries';
import Subscription from './subscriptions/notificationSub';
export default { ...Mutation, ...Query, ...Subscription };
