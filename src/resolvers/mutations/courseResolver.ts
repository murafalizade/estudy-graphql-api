import {
  student as userModel,
  teacher as teacherModel,
  ITeacher,
  ISubject,
} from '../../models/userModel';
import { IParent } from '../interfacetypes';
import courseModel, { ICourse } from '../../models/courseModel';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';

const courseResolver = {
  Mutation: {
    createCourse: async (
      parent: undefined,
      { courseInfo }: IParent
    ): Promise<string> => {
      const { teacherId } = courseInfo;
      const currentTeacher: ITeacher | null = await teacherModel.findOne({
        userId: teacherId,
      });
      courseInfo.groups.map((group) => (group.id = shortid.generate()));
      // courseInfo.groups.map(group => group.url_localtion = `http://localhost:3000/`)
      if (!currentTeacher) {
        return 'You are not teacher ';
      }
      const newCourse: ICourse = new courseModel({
        teacherId: courseInfo.teacherId,
        title: courseInfo.title,
        description: courseInfo.description,
        dates: courseInfo.dates,
        picture: currentTeacher.picture_url,
        teacherName: `${currentTeacher.firstName}  ${currentTeacher.lastName}  `,
        spoken: courseInfo.spoken,
        category: courseInfo.category,
        subCategory: courseInfo.subCategory,
        Choice: courseInfo.singleOrGroup,
        groups: courseInfo.groups,
        priceSingle: courseInfo.priceSingle,
        keyWord: courseInfo.keyWord,
        priceGroup: courseInfo.priceGroup,
      });
      currentTeacher.courses.push(newCourse);
      await currentTeacher.save();
      await newCourse.save();
      return 'succesfull';
    },
    joinCourse: async (
      parent: undefined,
      { courseId, userId, groupId }: IParent
    ): Promise<string> => {
      const user = await userModel.findOne({ userId });
      if (!user) {
        return 'User not founded';
      }
      const selectedCourse: ICourse | null = await courseModel.findOne({
        id: courseId,
      });
      if (!selectedCourse) {
        return 'Course not founded';
      }
      const group = selectedCourse.groups.find((group) => group.id === groupId);
      if (!group) {
        return 'Group not founded';
      }
      const key = await jwt.sign({ userId, groupId, courseId }, 'lalalal', {
        expiresIn: '30d',
      });
      const subject: ISubject = {
        id: shortid.generate(),
        title: selectedCourse.title,
        teachername: selectedCourse.teacherName,
        description: selectedCourse.description,
        groupId,
        startedDate: group.startDate,
        endedeDate: group.endDate,
        accesssToken: key,
      };
      selectedCourse.joincounter += 1;
      selectedCourse.joiner.push(userId);
      user.subject.push(subject);
      await selectedCourse.save();
      await user.save();
      return key;
    },
  },
};
export default courseResolver;
