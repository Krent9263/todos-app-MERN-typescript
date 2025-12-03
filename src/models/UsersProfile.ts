import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUsersProfile extends Document {
  userId: mongoose.Types.ObjectId;
  currentJob?: string;
  age?: number;
  company?: string;
  skills?: [{ type: string }];
  createdAt?: Date;
  updatedAt?: Date;
}

const UsersProfileSchema: Schema<IUsersProfile> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    currentJob: { type: String, required: false },
    age: { type: Number, required: false },
    company: { type: String, required: false },
    skills: [{ type: String }],
  },
  { timestamps: true }
);
const UsersProfile: Model<IUsersProfile> = (mongoose.models.UsersProfile as Model<IUsersProfile>) || mongoose.model<IUsersProfile>("UsersProfile", UsersProfileSchema);
export default UsersProfile;