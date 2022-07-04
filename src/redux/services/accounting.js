import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const accountingAPI = createApi({
  reducerPath: "accountingAPI",
  refetchOnReconnect: true,
  tagTypes: ["INVOICE", "WALLET"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    /** WALLET SECTION **/
    getWalletOverview: build.query({
      query: () => ({ url: "/wallet/overview" }),
      transformResponse: (res) => res.data,
      providesTags: ["WALLET"],
    }),
    getWalletTransactions: build.query({
      query: (queryParams) => ({
        url: "wallet/transactions",
        params: queryParams,
      }),
      transformResponse: (res) => ({ data: res.data, meta: res.meta }),
    }),
    addWalletDeposit: build.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res) => (res ? ["WALLET"] : []),
    }),

    /** INVOICES SECTION **/
    getInvoices: build.query({
      query: (queryParams) => ({ url: "/invoices", params: queryParams }),
      transformResponse: (res) => ({ data: res.data, meta: res.meta }),
      providesTags: (res) =>
        res ? res.data.map(({ id }) => ({ type: "INVOICE", id })) : [],
    }),
    payInvoice: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/invoices/pay/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, error, { id }) =>
        res ? [{ type: "INVOICE", id }, "WALLET"] : [],
    }),
    reportInvoice: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/invoices/report/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (res, error, { id }) =>
        res ? [{ type: "INVOICE", id }] : [],
    }),
    downloadInvoicePDF: build.query({
      query: (id) => ({ url: `/invoices/download/${id}` }),
    }),
  }),
});

export const {
  useGetWalletOverviewQuery,
  useGetWalletTransactionsQuery,
  useAddWalletDepositMutation,

  useGetInvoicesQuery,
  usePayInvoiceMutation,
  useReportInvoiceMutation,
  useLazyDownloadInvoicePDFQuery,
} = accountingAPI;
