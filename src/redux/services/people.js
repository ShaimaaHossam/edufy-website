import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const peopleAPI = createApi({
  reducerPath: "peopleAPI",
  refetchOnReconnect: true,
  tagTypes: ["People"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllUsersByRole: build.query({
      query: (role) => ({
        url: "/users",
        params: { listing: "1", role },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetAllUsersByRoleQuery } = peopleAPI;
