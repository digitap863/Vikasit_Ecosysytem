import mongoose, { Schema, Document } from "mongoose";

export interface IProjectPhoto extends Document {
  id: string;
  title: string;
  imageUrl: string;
  publicId?: string;
  category?: string;
  description?: string;
  altText?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectPhotoSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: "" },
    category: { type: String, default: "Project Photo" },
    description: { type: String, default: "" },
    altText: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.ProjectPhoto ||
  mongoose.model<IProjectPhoto>("ProjectPhoto", ProjectPhotoSchema);
