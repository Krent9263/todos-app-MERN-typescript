import mongoose, {Schema, Document, Model } from "mongoose";

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  fullname?: string;
  title: string;
  description?: string;
  completed: boolean;
  likes?: { _id?: mongoose.Types.ObjectId; user?: mongoose.Types.ObjectId; fullname?: string; createdAt?: Date }[];
  comments?: { _id?: mongoose.Types.ObjectId; userId: mongoose.Types.ObjectId; text: string; fullname?: string; createdAt: Date }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema: Schema<ITodo> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    fullname: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    likes: [{ 
      user: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, 
      fullname: { type: String, required: false },
      createdAt: { type: Date, default: Date.now } }],
    comments: [{
      userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      fullname: { type: String, required: false },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

const Todo: Model<ITodo> = (mongoose.models.Todo as Model<ITodo>) || mongoose.model<ITodo>("Todo", TodoSchema);
export default Todo;