import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse<void>> {
  try {
    const response = await resend.emails.send({
      from: "SecretSender <no-reply@secretsender.space>", 
      to: email,
      subject: "Verify your email for SecretSender", 
      react: VerificationEmail({ username, otp: verifyCode }), 
    });

    console.log("Resend response:", response); 

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError: any) {
    console.error("Error sending verification email:", emailError);


    const errorMessage =
      emailError?.response?.data?.message || "Failed to send verification email";

    return {
      success: false,
      message: errorMessage,
    };
  }
}
