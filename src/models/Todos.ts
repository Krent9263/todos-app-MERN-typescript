import mongoose, {Schema, Document, Model } from "mongoose";

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TodoSchema: Schema<ITodo> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo: Model<ITodo> = (mongoose.models.Todo as Model<ITodo>) || mongoose.model<ITodo>("Todo", TodoSchema);
export default Todo;