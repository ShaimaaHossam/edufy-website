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
        url: "/dashboard/properties-state",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),

    getPropertyStateDetails: build.query({
      query: (id) => ({ url: `/dashboard/properties-state/${id}` }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, id) => [{ type: "Dashboard", id }],
    }),

    getMaterialSpending: build.query({
      query: (queryParams) => ({
        url: "/dashboard/orders-materials-spending",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),

    getMaterialSpendingDetails: build.query({
      query: (id) => ({ url: `/dashboard/orders-materials-spending/${id}` }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, id) => [{ type: "Dashboard", id }],
    }),

    getTotalOrders: build.query({
      query: (queryParams) => ({
        url: "/dashboard/orders-total",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),
    
    getTotalDetailsOrder: build.query({
      query: (queryParams) => ({
        url: "/dashboard/orders-total/daily",
        params: queryParams,
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),

    getTotalOrdersByService: build.query({
      query: (queryParams) => ({
        url: "/dashboard/services-orders",
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
  useGetPropertyStateDetailsQuery,
  useGetMaterialSpendingQuery,
  useGetMaterialSpendingDetailsQuery,
  useGetTotalOrdersQuery,
  useGetTotalDetailsOrderQuery,
  useGetTotalOrdersByServiceQuery,
  useGetWalletOverviewQuery,
  useGetAllRolesQuery,
} = dashboardAPI;
