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
    }),

    getMaterialSpending: build.query({
      query: (queryParams) => ({
        url: "/orders/materials/spending",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
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

    getAllRoles: build.query({
      query: () => ({
        url: "/roles",
        params: { listing: "1" },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useGetPropertyStateQuery,
  useGetMaterialSpendingQuery,
  useGetTotalOrdersQuery,
  useGetTotalOrdersByServiceQuery,
  useGetWalletOverviewQuery,
  useGetAllRolesQuery,
} = dashboardAPI;
