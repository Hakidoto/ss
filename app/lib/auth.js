import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../components/db";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "alez" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials){
        if(!credentials?.username || !credentials?.password){
            return null

        }
        const existingUser = await prisma.user.findUnique({
            where: {username: credentials.username}
        })
        if(!existingUser){
            return null
        }

        const passwordMatch = await compare(credentials.password, existingUser.password)

        if(!passwordMatch){
            return null
        }

        return {
            id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email
        }
      }



    }),
  ],
};
