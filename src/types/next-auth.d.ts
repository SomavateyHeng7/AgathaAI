import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      tier: string;
      apiKey?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    tier?: string;
    apiKey?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tier: string;
    apiKey?: string;
  }
}
