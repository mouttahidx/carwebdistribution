import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ,

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        let res = null;
        try {
          res = await axios.post(
            process.env.NEXT_PUBLIC_WEBSITE_URL + "/wp-json/jwt-auth/v1/token",
            {
              username: email,
              password: password,
            }
          );

          if (res.status === 200 && res.data?.user?.token) {
            return {
              email: res.data.user.user_email,
              token: res.data.user.token,
              name: res.data.user.user_display_name,
              id: res.data.user.id,
              vehicles: res.data.vehicles
            };
          }
        } catch (error) {
          return Promise.reject(new Error(error));
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/connexion",
  },

  callbacks: {
    jwt: async ({ token, user, trigger,session }) => {
      user && (token.user = user)
      if(trigger === "update")
      {
        token.user.vehicles = session
      }
      return token;
    },
    
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }

  },

  debug: true,
};

export default NextAuth(authOptions);
