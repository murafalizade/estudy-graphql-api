import userResolver from './userResolver';
import courseResolver from './courseResolver';
import NotifMut from './notifResolver';

export default { ...courseResolver, ...userResolver, ...NotifMut };
