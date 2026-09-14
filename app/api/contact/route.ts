import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { sendContactNotificationEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, newsletter, product } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Store inquiry in MongoDB
    const newInquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      message: message.trim(),
      newsletter: Boolean(newsletter),
      product: product || "",
    });

    // Send email notification via SMTP (runs without blocking critical response if fails)
    const mailResult = await sendContactNotificationEmail({
      name: newInquiry.name,
      email: newInquiry.email,
      phone: newInquiry.phone,
      message: newInquiry.message,
      newsletter: newInquiry.newsletter,
      product: newInquiry.product,
      createdAt: newInquiry.createdAt,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        data: {
          id: newInquiry._id,
          createdAt: newInquiry.createdAt,
        },
        mailSent: mailResult.success,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
