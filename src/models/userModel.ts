import mongoose, { Document, Schema } from 'mongoose';
import shortid from 'shortid';
import { ICourse } from './courseModel';
import { INotif } from './natificationModel';

export interface ISubject {
  id: string;
  title: string;
  teachername: string;
  description: string;
  groupId: string;
  startedDate: string[];
  endedeDate: string[];
  accesssToken: string;
}

export interface IUser extends Document {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  notifications: INotif[];
  subject: ISubject[];
  isTeacher: boolean;
}

const studentSchema = new mongoose.Schema({
  id: { type: String, default: shortid.generate() },
  userId: { type: String, default: shortid.generate() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  notifications: [],
  subject: [],
  isTeacher: { type: Boolean, default: false },
});

export interface ITeacher extends IUser {
  courses: ICourse[];
  bio: string;
  speacilist: string;
  picture_url: string;
  video_url: string;
  stars: number;
  income: number;
  experience: string;
  accepted: string;
}

function extendSchema(Schema: Schema, definition: any) {
  return new mongoose.Schema(Object.assign({}, Schema.obj, definition));
}

const teacherSchema = extendSchema(studentSchema, {
  courses: Array,
  bio: String,
  speacilist: String,
  picture_url: String,
  video_url: String,
  stars: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  experience: String,
  accepted: { type: String, default: 'pending' },
});

export const student = mongoose.model<IUser>('students', studentSchema);
export const teacher = mongoose.model<ITeacher>('teachers', teacherSchema);
