import { RequestInternal, User, AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";
import { SHA256 } from "crypto-js";

const prisma = new PrismaClient();

type CredentialFeild = {
  email: string;
  password: string;
};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      name: "Credenials",
      credentials: {
        email: { label: "Emial", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> {
        const { email, password } = credentials as CredentialFeild;

        const hashPassword = SHA256(password).toString();

        const ret = await prisma.user.findUnique({
          where: {
            email,
            password: hashPassword,
          },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
          },
        });

        if (ret?.id) {
          return ret;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "YOUR KEY ",
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
