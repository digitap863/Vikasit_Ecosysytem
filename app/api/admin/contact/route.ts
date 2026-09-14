import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

export async function GET() {
  try {
    await connectToDatabase();

    const inquiries = await ContactInquiry.find({})
      .sort({ createdAt: -1 })
      .lean();

    const totalCount = inquiries.length;

    return NextResponse.json({
      success: true,
      data: inquiries,
      counts: {
        total: totalCount,
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin contact inquiries:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch contact inquiries." },
      { status: 500 }
    );
  }
}
