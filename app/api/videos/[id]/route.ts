import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectVideoModel from "@/models/ProjectVideo";

interface Params {
  params: Promise<{ id: string }> | { id: string };
}

export async function DELETE(request: Request, context: Params) {
  try {
    await connectToDatabase();
    const resolvedParams = await context.params;
    const targetId = decodeURIComponent(resolvedParams.id);

    const deleted = await ProjectVideoModel.findOneAndDelete({
      $or: [{ id: targetId }, { _id: targetId.match(/^[0-9a-fA-F]{24}$/) ? targetId : null }],
    });

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting project video:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete video" },
      { status: 500 }
    );
  }
}
