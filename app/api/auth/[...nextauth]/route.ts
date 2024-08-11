import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/User"; // Update the path as per your project structure
import dbConnect from "@/lib/mongoDb";
import { sendNewUserMail } from "@/app/actions";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });
      // console.log("existingUser", existingUser);
      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          name: user.name,
        });
        await newUser.save();

        await sendNewUserMail({
          userName: user.name || "",
          userEmail: user.email ?? "",
          userPhoto: user.image ?? "",
        });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
