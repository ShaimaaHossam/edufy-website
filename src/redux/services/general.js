import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const generalAPI = createApi({
  reducerPath: "generalAPI",
  refetchOnReconnect: true,
  tagTypes: ["People"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllCities: build.query({
      query: () => ({ url: "/cities", params: { listing: "1" } }),
      transformResponse: (res) => res.data,
    }),

    getAllUsedCities: build.query({
      query: (companyID) => ({
        url: `/cities/${companyID}`,
        params: { listing: "1" },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetAllCitiesQuery, useGetAllUsedCitiesQuery } = generalAPI;
