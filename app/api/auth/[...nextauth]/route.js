import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectToDB } from '@utils/database'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                if (session && session.user && session.user.email) {
                    const sessionUser = await User.findOne({
                        email: session.user.email
                    });

                    if (sessionUser) {
                        session.user.id = sessionUser._id.toString();
                    }
                }
            } catch (error) {
                console.error("Error fetching session user:", error);
            }

            return session;
        },
        async signIn({ profile }) {
            try {
                const connection = await connectToDB();
                if (!connection) {
                    throw new Error('Failed to connect to the database');
                }
        
                // Check if user exists
                const existingUser = await User.findOne({
                    email: profile.email
                });
        
                // If user doesn't exist, create a new user
                if (!existingUser) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
        
                // Return true indicating successful sign-in
                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                // Return false indicating sign-in failure
                return false;
            }
        }

    }
})

export { handler as GET, handler as POST };