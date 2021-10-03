import mongoose, { Document, Schema } from 'mongoose';
import shortid from 'shortid';
import { IGroup } from '../resolvers/interfacetypes';

export interface ICourse extends Document {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  dates: [];
  spoken: string;
  picture: string;
  teacherName: string;
  joincounter: number;
  category: string;
  subCategory: string;
  Choice: string;
  minStudentCount: number;
  priceSingle: number;
  keyWord: [];
  groups: IGroup[];
  priceGroup: number;
  joiner: string[];
}
const CourseSchema: Schema = new mongoose.Schema({
  id: { type: String, default: shortid.generate() },
  teacherId: { type: String, required: true },
  title: { type: String, min: 3, max: 250, required: true },
  description: { type: String, min: 6, max: 250, required: true },
  dates: [],
  spoken: String,
  picture: String,
  teacherName: String,
  createDate: { type: Date, default: Date.now() },
  joincounter: { type: Number, default: 0 },
  category: { type: String },
  subCategory: { type: String },
  Choice: { type: String },
  minStudentCount: { type: Number, default: 1 },
  priceSingle: { type: Number },
  keyWord: [],
  groups: [],
  priceGroup: { type: Number },
  joiner: [],
});
const Course = mongoose.model<ICourse>('course', CourseSchema);
export default Course;
