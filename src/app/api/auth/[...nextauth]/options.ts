import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel from '@/model/User'
import dbConnect from '@/lib/dbConnect';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email or Username', type: 'text' },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ],
                    })

                    if (!user) {
                        throw new Error('No user found with the given email or username.')
                    }

                    if (!user.isverified) {
                        throw new Error('User is not verified.')
                    }

                    const ispasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (!ispasswordCorrect) {
                        throw new Error('Incorrect password.')  
                    }else{
                        return user;
                    };




                    } catch (error: any) {
                        throw new Error(error.message || 'Authorization failed.')
                    }
                }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.isverified = user.isverified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },

        async session({ session, token }) {
            
            if (token && session.user) {
                session.user._id = token.id as string;
                session.user.isverified = token.isverified as boolean;
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
                session.user.username = token.username as string;
            }

            return session;
        }


    },

    pages: {
        signIn: '/signin',
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,

    

}

