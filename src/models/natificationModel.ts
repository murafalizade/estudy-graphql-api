import mongoose, { Document } from 'mongoose';
import shortid from 'shortid';

export interface INotif extends Document {
  id: string;
  title: string;
  content: string;
  seen: boolean;
}

const Notification = mongoose.model<INotif>(
  'notifications',
  new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    title: String,
    createDate: { type: Date, default: Date.now() },
    content: String,
    seen: { type: Boolean, default: false },
  })
);

export default Notification;
