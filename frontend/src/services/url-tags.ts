import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import JWTHelper from "@/commons/helpers/JwtHelper";
import { Tag } from "@/commons/types/Tags";

const baseName = "/tags";
export const urlTagsApi = createApi({
  reducerPath: "urlTagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.106:5000/api/v1" + baseName,
    prepareHeaders: (headers, { getState }) => {
      const token = JWTHelper.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    fetchTags: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/`,
        params: {
          page: page?.toString(),
          pageSize: pageSize?.toString(),
        },
      }),

      providesTags: ["Tags"],
    }),
    createTag: builder.mutation({
      query: (newTag) => ({
        url: "/",
        method: "POST",
        body: newTag,
      }),

      invalidatesTags: ["Tags"],
    }),
    updateTag: builder.mutation({
      query: (formData) => {
        return {
          url: `${formData}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Tags"],
    }),

    deleteTag: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),
    softDeleteTag: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${id}/soft-delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const {
  useFetchTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useSoftDeleteTagMutation,
} = urlTagsApi;
