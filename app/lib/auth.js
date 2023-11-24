import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../components/db";
import { compare } from "bcrypt";
import { user } from "@nextui-org/react";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
      // Configuración del tiempo de expiración del token
      maxAge: 60 * 60, // Duración en segundos
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
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, user);
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        return{
          ...token, 
          username: user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      console.log(token, session);
      // Send properties to the client, like an access_token and user id from a provider.
      if (session) {
        return{
          ...session, 
          user: {
            ...session.user,
            username: token.username
          }
        }
      }
      
      return session
    }
  }
};
