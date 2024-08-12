import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BrandLogo } from "@/commons/types/Logo";
import JWTHelper from "@/commons/helpers/JwtHelper";
import { dynamicBlurDataUrl } from "@/commons/helpers/placeholder"; // Adjust the import path as needed

export const logoApi = createApi({
  reducerPath: "logoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = JWTHelper.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Logo"],
  endpoints: (builder) => ({
    fetchLogos: builder.query({
      query: ({ page, pageSize }) => ({
        url: `/logos`,
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
        },
      }),
      transformResponse: async (response: {
        result: { data: BrandLogo[] };
      }) => {
        const logos = response.result.data;

        // Add blurHash to each logo
        const modifiedLogos = await Promise.all(
          logos.map(async (logo) => ({
            ...logo,
            blurHash: await dynamicBlurDataUrl(logo.logo_path),
          }))
        );

        return {
          ...response,
          result: {
            ...response.result,
            data: modifiedLogos,
          },
        };
      },
      providesTags: ["Logo"],
    }),
    createLogo: builder.mutation({
      query: (newLogo) => ({
        url: "logos",
        method: "POST",
        body: newLogo,
      }),
      transformResponse: async (response: { result: BrandLogo }) => {
        const logo = response.result;

        // Add blurHash to each logo
        const modifiedLogos = {
          ...logo,
          blurHash: await dynamicBlurDataUrl(logo.logo_path),
        };

        const result = {
          ...response,
          result: {
            ...modifiedLogos,
          },
        };

        console.log(result);
        return result;
      },
      invalidatesTags: ["Logo"],
    }),
    updateLogo: builder.mutation({
      query: (formData) => {
        if (formData instanceof FormData) {
          return {
            url: `logos/${formData.get("logo_id")}`,
            method: "PATCH",
            body: formData,
          };
        } else {
          throw new Error("formData must be an instance of FormData");
        }
      },
      invalidatesTags: ["Logo"],
    }),

    deleteLogo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `logos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logo"],
    }),
    softDeleteLogo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `logos/${id}/soft-delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Logo"],
    }),
  }),
});

export const {
  useFetchLogosQuery,
  useCreateLogoMutation,
  useUpdateLogoMutation,
  useDeleteLogoMutation,
  useSoftDeleteLogoMutation,
} = logoApi;
