import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  refetchOnReconnect: true,
  tagTypes: ["Dashboard"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getPropertyState: build.query({
      query: (queryParams) => ({
        url: "/properties/state",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Dashboard", id })),
              { type: "Dashboard", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Dashboard", id: "PARTIAL-LIST" }],
    }),

    getMaterialSpending: build.query({
      query: (queryParams) => ({
        url: "/orders/material/spending",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Dashboard", id })),
              { type: "Dashboard", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Dashboard", id: "PARTIAL-LIST" }],
    }),

    getTotalOrders: build.query({
      query: (queryParams) => ({
        url: "/orders/total",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),

    getTotalOrdersByService: build.query({
      query: (queryParams) => ({
        url: "/services/orders",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),

    getWalletOverview: build.query({
      query: (queryParams) => ({
        url: "/wallet/overview",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),
  }),
});

export const {
  useGetPropertyStateQuery,
  useGetMaterialSpendingQuery,
  useGetTotalOrdersQuery,
  useGetTotalOrdersByServiceQuery,
  useGetWalletOverviewQuery,
} = dashboardAPI;
