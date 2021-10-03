import { GraphQLUpload } from 'graphql-upload';

import { IParent } from '../interfacetypes';
import courseModel, { ICourse } from '../../models/courseModel';
const courseQueries = {
  Query: {
    courses: async (): Promise<ICourse[]> => {
      const allCourse = await courseModel.find({});
      return allCourse;
    },
    course: async (
      parent: undefined,
      { id }: IParent
    ): Promise<ICourse | void> => {
      console.log(id);
      const currentCourse: ICourse | null = await courseModel.findOne({
        id: id,
      });
      if (currentCourse) {
        return currentCourse;
      } else {
        console.log('Course doenst found');
      }
    },
    Upload: GraphQLUpload,
  },
};

export default courseQueries;
