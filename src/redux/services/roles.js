import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const rolesAPI = createApi({
  reducerPath: "rolesAPI",
  refetchOnReconnect: true,
  tagTypes: ["Roles"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllRolesByUserType: build.query({
      query: (userType) => ({
        url: "/roles",
        params: { listing: "1", "filter[group]": userType },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetAllRolesByUserTypeQuery } = rolesAPI;
