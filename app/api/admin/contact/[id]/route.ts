import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    const deletedInquiry = await ContactInquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return NextResponse.json(
        { success: false, error: "Inquiry message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry message deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting contact inquiry:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
