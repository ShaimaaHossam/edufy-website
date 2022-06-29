import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const accountingAPI = createApi({
  reducerPath: "accountingAPI",
  refetchOnReconnect: true,
  tagTypes: [],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getWalletOverview: build.query({
      query: () => ({ url: "/wallet/overview" }),
      transformResponse: (res) => res.data,
    }),
    getWalletTransactions: build.query({
      query: (queryParams) => ({
        url: "wallet/transactions",
        params: queryParams,
      }),
      transformResponse: (res) => res.data,
    }),

    addWalletDeposit: build.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useGetWalletOverviewQuery,
  useGetWalletTransactionsQuery,

  addWalletDeposit,
} = accountingAPI;
