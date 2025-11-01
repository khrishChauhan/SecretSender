import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isverified: true
        });

        


        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    message: "Username is already taken.",
                    success: false
                },
                { status: 400 }
            );
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({
            email,
            isverified: true
        });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isverified) {
                return Response.json(
                    {
                        message: "Email is already registered with this username.",
                        success: false
                    },
                    { status: 400 }
                );
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.username = username;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserVerifiedByEmail.save();
                
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                isverified: false,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessages: true,
                messages: [],
            })

            await newUser.save();

        }

        const emailResponse =  await sendVerificationEmail(email,username, verifyCode);

        if (!emailResponse.success) {
            return Response.json(
                {
                    message: emailResponse.message || "Failed to send verification email.",
                    success: false
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                message: "User registered successfully. Please check your email for the verification code.",
                success: true
            },
            { status: 201 }
        );


    } catch (error) {
        console.error("Error in POST /api/route:", error);
        return Response.json(
            {
                message: "Internal Server Error",
                success: false
            },
            { status: 500 }
        )
    }
}
