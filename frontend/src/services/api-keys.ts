import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import JWTHelper from "@/commons/helpers/JwtHelper";

export interface ApiKey {
  status: boolean;
  path: string;
  message: string;
  statusCode: number;
  result: {
    api_key: string;
    expires_at: Date | null;
    is_deleted: boolean;
  };
  timestamp: string;
}

const baseName = "/api-key";
export const apiKeysApi = createApi({
  reducerPath: "urlKeysApi",
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
  tagTypes: ["Keys"],
  endpoints: (builder) => ({
    createApiKey: builder.mutation<ApiKey, { expiresAt?: Date | string }>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Keys"],
    }),
    getApiKey: builder.query<ApiKey, void>({
      query: () => "",
      providesTags: ["Keys"],
    }),
    deleteApiKey: builder.mutation<void, void>({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
      invalidatesTags: ["Keys"],
    }),
    updateApiKey: builder.mutation<void, { expiresAt: Date | string }>({
      query: (body) => ({
        url: "",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Keys"],
    }),
  }),
});

export const {
  useCreateApiKeyMutation,
  useGetApiKeyQuery,
  useDeleteApiKeyMutation,
  useUpdateApiKeyMutation,
} = apiKeysApi;
