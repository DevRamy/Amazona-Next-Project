import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../../../utils/db";
import User from '../../../models/User';
import bcryptjs from "bcryptjs";

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token,user}) {
            if(user?.id) token.id = user.id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({session, token}) {
            if(token?._id) session._id = token._id;
            if(token?.isAdmin) session.isAdmin = token.isAdmin;
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await db.connect();
                //@ts-ignore
                const user = await User.findOne({email: credentials!.email});
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials!.password, user.password)) {
                    return {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin
                    };
                }
                throw new Error(`Invalid email or password`);
            }
          })
  ],
});

/*

            async authorize(credentials){
            }
        

*/