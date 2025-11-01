import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse<void>>{
    try{

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to:email,
            subject: "Verify your email for Mystery Message",
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return{success: true, message: "Verification email sent successfully" };
    }catch(emailError : any ){
        console.log("Error sending verification email:", emailError.response.data);
        return{success: false, message: "Failed to send verification email" };  
    }
}