import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  newsletter: boolean;
  product?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    newsletter: { type: Boolean, default: false },
    product: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Delete model cache if present to ensure Next.js HMR picks up schema changes (like adding phone)
if (process.env.NODE_ENV === "development" && mongoose.models.ContactInquiry) {
  delete mongoose.models.ContactInquiry;
}

const ContactInquiryModel: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiryModel;
