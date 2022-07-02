import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const accountingAPI = createApi({
  reducerPath: "accountingAPI",
  refetchOnReconnect: true,
  tagTypes: ["INVOICE"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    /** WALLET SECTION **/
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

    /** INVOICES SECTION **/
    getInvoices: build.query({
      query: (queryParams) => ({ url: "/invoices", params: queryParams }),
      transformResponse: (res, meta, queryParams) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res ? res.data.map(({ id }) => ({ type: "INVOICE", id })) : [],
    }),
    payInvoice: build.mutation({
      query: (id) => ({ url: `/invoices/pay/${id}`, method: "POST" }),
      invalidatesTags: (res, error, id) =>
        res ? [{ type: "INVOICE", id }] : [],
    }),
    rejectInvoice: build.mutation({
      query: (id) => ({ url: `/invoices/reject/${id}`, method: "POST" }),
      invalidatesTags: (res, error, id) =>
        res ? [{ type: "INVOICE", id }] : [],
    }),
  }),
});

export const {
  useGetWalletOverviewQuery,
  useGetWalletTransactionsQuery,
  useAddWalletDepositMutation,

  useGetInvoicesQuery,
  usePayInvoiceMutation,
  useRejectInvoiceMutation,
} = accountingAPI;
