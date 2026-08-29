import mongoose, { Schema, Document } from "mongoose";

export interface IProjectVideo extends Document {
  id: string;
  title: string;
  youtubeUrl: string;
  embedUrl: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectVideoSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    embedUrl: { type: String, required: true },
    category: { type: String, default: "Project Video" },
  },
  { timestamps: true }
);

export default mongoose.models.ProjectVideo ||
  mongoose.model<IProjectVideo>("ProjectVideo", ProjectVideoSchema);
