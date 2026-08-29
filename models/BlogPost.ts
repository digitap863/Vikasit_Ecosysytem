import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSection {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface IBlogPostContent {
  intro?: string;
  sections?: IBlogSection[];
  html?: string;
}

export interface IBlogPost extends Document {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: IBlogPostContent;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    paragraphs: { type: [String], default: [] },
    bullets: { type: [String], default: [] },
  },
  { _id: false }
);

const BlogPostContentSchema = new Schema<IBlogPostContent>(
  {
    intro: { type: String, default: "" },
    sections: { type: [BlogSectionSchema], default: [] },
    html: { type: String, default: "" },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    id: { type: Number, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, default: "5 Min Read" },
    image: { type: String, required: true },
    content: { type: BlogPostContentSchema, default: {} },
  },
  {
    timestamps: true,
  }
);

// Reuse existing model if defined (hot reload safety in Next.js)
const BlogPostModel: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPostModel;
