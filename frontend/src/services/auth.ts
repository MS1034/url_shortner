import JWTHelper from "@/commons/helpers/JwtHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // TODO: add in config file or env
    baseUrl: process.env.BASE_URL || "http://localhost:5000/api/v1",

    prepareHeaders: (headers, { getState }) => {
      const token = JWTHelper.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signupUser: builder.mutation({
      query: (user) => ({
        url: "auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    checkUsername: builder.mutation({
      query: (username) => ({
        url: `auth/check-username`,
        params: { username },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupUserMutation,
  useLogoutMutation,
  useCheckUsernameMutation,
} = authApi;
