import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const unitsAPI = createApi({
  reducerPath: "unitsAPI",
  refetchOnReconnect: true,
  tagTypes: ["Units"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllUnitsByUserType: build.query({
      query: (unitId) => ({
        url: "/units",
        params: { listing: "1", "filter[property_id]": unitId },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetAllUnitsByUserTypeQuery } = unitsAPI;
