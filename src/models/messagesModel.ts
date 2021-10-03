import mongoose from 'mongoose';
import shortid from 'shortid';

const Messages = mongoose.model(
  'message',
  new mongoose.Schema(
    {
      id: { type: String, default: shortid.generate() },
      conversationId: { type: String },
      sender: { type: String },
      text: { type: String },
    },
    { timestamps: true }
  )
);

export default Messages;
