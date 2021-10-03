import mailer from '../../middlewares/mailMiddleware';
import { IParent } from '../interfacetypes';
import { PubSub } from 'graphql-subscriptions';
import { student as userModel, IUser } from '../../models/userModel';
import notificationModel, { INotif } from '../../models/natificationModel';
const pubsub = new PubSub();
const sad = 'sad';
const NotifMut = {
  Mutation: {
    createdNotification: async (
      parent: undefined,
      { notificationInfo }: IParent
    ): Promise<string> => {
      console.log(notificationInfo);
      const { senderId } = notificationInfo;
      const currentUser: IUser | null = await userModel.findOne({
        userId: senderId,
      });
      if (!currentUser) {
        return 'User is not defined';
      }
      const newNotification = new notificationModel(notificationInfo);
      currentUser.notifications.push(newNotification);
      await newNotification.save();
      await currentUser.save();
      pubsub.publish(sad, { notifications: currentUser.notifications });
      mailer(currentUser.email, newNotification.title, newNotification.content);
      return 'Succesfull';
    },
    seenNotification: async (
      parent: undefined,
      { id }: IParent
    ): Promise<INotif | undefined> => {
      const currentNotif: INotif | null = await notificationModel.findOne({
        id,
      });
      if (currentNotif) {
        currentNotif.seen = true;
        await currentNotif.save();
        console.log(currentNotif);
        return currentNotif;
      } else {
        console.log('exist ');
      }
    },
  },
};

export default NotifMut;
