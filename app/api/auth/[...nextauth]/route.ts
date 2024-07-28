import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";
import dbConnect from "@/lib/mongoDb";

const handler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        try {
          await dbConnect();
          // console.log("signIn", user);
          const existingUser = await User.findOne({ email: user.email });
          // console.log("existingUser", existingUser);
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              profilePicture: user.image,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      },
    },
  });

export { handler as GET, handler as POST };
