import { ReadStream } from 'fs';
export interface IregisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface ILoginInfo {
  email: string;
  password: string;
}
interface IFiles {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
interface IFile {
  file: IFiles;
}
export interface ITutorInfo {
  userId: string;
  video_url: string;
  bio: string;
  speacilist: string;
  picture: IFile;
  experience: string;
}

export interface IGroup {
  id: string;
  title: string;
  startDate: string[];
  endDate: string[];
}

export interface ICourseInfo {
  teacherId: string;
  title: string;
  description: string;
  spoken: string;
  priceSingle: number;
  priceGroup: number;
  category: string;
  subCategory: string;
  keyWord: [];
  groups: IGroup[];
  singleOrGroup: string;
  dates: string[];
}
export interface INotificationInfo {
  senderId: string;
  title: string;
  createDate: string;
  content: string;
}

export interface IParent {
  registerInfo: IregisterInfo;
  id: string;
  loginInfo: ILoginInfo;
  tutorInfo: ITutorInfo;
  courseInfo: ICourseInfo;
  notificationInfo: INotificationInfo;
  courseId: string;
  userId: string;
  groupId: string;
}
