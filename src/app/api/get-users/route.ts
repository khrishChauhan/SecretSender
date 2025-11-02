import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET() {
  await dbConnect();

  try {

    const users = await UserModel.find(
      { isverified: true },
      { _id: 0, username: 1} 
    ).lean();

    return Response.json(
      { success: true, users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
