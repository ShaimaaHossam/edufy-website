import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const peopleAPI = createApi({
  reducerPath: "peopleAPI",
  refetchOnReconnect: true,
  tagTypes: ["People"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
    }),

    getAllUsersByRole: build.query({
      query: (role) => ({
        url: "/users",
        params: { listing: "1", role },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useUpdateUserMutation, useGetAllUsersByRoleQuery } = peopleAPI;
