import { IParent } from '../interfacetypes';
import {
  student as userModel,
  teacher as teacherModel,
  IUser,
  ITeacher,
} from '../../models/userModel';
const QueryResolver = {
  Query: {
    users: async (): Promise<IUser[]> => {
      console.log('asd');
      const allUsers = await userModel.find({});
      return allUsers;
    },
    teachers: async (): Promise<ITeacher[]> => {
      const allUsers = await teacherModel.find({});
      return allUsers;
    },
    user: async (parent: undefined, { id }: IParent): Promise<IUser | void> => {
      const currentuser = await userModel.findOne({ id: id });
      if (currentuser) {
        return currentuser;
      } else {
        console.log('User doesnt found');
      }
    },
  },
};

export default QueryResolver;
