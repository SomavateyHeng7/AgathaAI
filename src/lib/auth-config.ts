import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "./database";
import bcrypt from "bcrypt";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Get user from database
          const result = await query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email as string]
          );

          if (result.rows.length === 0) {
            return null;
          }

          const user = result.rows[0];

          // Verify password
          const isValid = await bcrypt.compare(credentials.password as string, user.password_hash);

          if (!isValid) {
            return null;
          }

          // Get user's API key
          const apiKeyResult = await query(
            "SELECT key_hash FROM api_keys WHERE user_id = $1 AND is_active = true LIMIT 1",
            [user.id]
          );

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier,
            apiKey: apiKeyResult.rows[0]?.key_hash || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await query(
            "SELECT * FROM users WHERE email = $1",
            [user.email]
          );

          if (existingUser.rows.length === 0) {
            // Create new user
            const newUser = await query(
              `INSERT INTO users (email, name, tier, email_verified, created_at)
               VALUES ($1, $2, $3, true, NOW())
               RETURNING id`,
              [user.email, user.name, "free"]
            );

            const userId = newUser.rows[0].id;

            // Generate API key
            const apiKey = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
            const keyHash = await bcrypt.hash(apiKey, 10);

            await query(
              `INSERT INTO api_keys (user_id, key_hash, name, created_at)
               VALUES ($1, $2, $3, NOW())`,
              [userId, keyHash, "Default API Key"]
            );

            user.id = userId;
          } else {
            user.id = existingUser.rows[0].id;
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.tier = (user as any).tier;
        token.apiKey = (user as any).apiKey;
      }

      if (account?.provider === "google" && token.email) {
        // Get user data from database
        const result = await query(
          "SELECT id, tier FROM users WHERE email = $1",
          [token.email]
        );

        if (result.rows.length > 0) {
          token.id = result.rows[0].id;
          token.tier = result.rows[0].tier;

          // Get API key
          const apiKeyResult = await query(
            "SELECT key_hash FROM api_keys WHERE user_id = $1 AND is_active = true LIMIT 1",
            [result.rows[0].id]
          );

          token.apiKey = apiKeyResult.rows[0]?.key_hash || null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).tier = token.tier as string;
        (session.user as any).apiKey = token.apiKey as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
