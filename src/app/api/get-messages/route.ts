import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET() {

  await dbConnect();


  const session = await getServerSession(authOptions);
  const user = session?.user as User & { _id?: string };

  if (!session || !user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
  
    const foundUser = await UserModel.findById(user._id).select("messages");

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    
    return Response.json(
      { success: true, messages: foundUser.messages || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json(
      { success: false, message: "Error fetching messages" },
      { status: 500 }
    );
  }
}
