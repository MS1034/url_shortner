import JWTHelper from "@/commons/helpers/JwtHelper";
import { Url } from "@/commons/types/Url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const urlApi = createApi({
  reducerPath: "urlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = JWTHelper.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Urls"],

  endpoints: (builder) => ({
    fetchUrls: builder.query({
      query: (params) => ({
        url: `/urls`,
        method: "GET",
        params,
      }),
      providesTags: ["Urls"],
    }),

    createUrl: builder.mutation({
      query: (formData) => ({
        url: "/urls",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Urls"],
    }),

    updateUrl: builder.mutation({
      query: (formData) => ({
        url: `/urls/${formData.url_id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Urls"],
    }),

    deleteUrl: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/urls/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Urls"],
    }),

    softDeleteUrl: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/urls/${id}/soft-delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Urls"],
    }),

    pregenerateUrl: builder.mutation({
      query: (formData) => ({
        url: `/urls/pregenerate`,
        method: "POST",
        body: formData,
        params: formData,
      }),
      invalidatesTags: ["Urls"],
    }),
  }),
});

export const {
  useFetchUrlsQuery,
  useCreateUrlMutation,
  useUpdateUrlMutation,
  useSoftDeleteUrlMutation,
  usePregenerateUrlMutation,
} = urlApi;
