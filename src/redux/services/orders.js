import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  refetchOnReconnect: true,
  tagTypes: ["ORDERS", "ORDER"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    /* ORDERS CRUD */
    getOrders: build.query({
      query: (queryParams) => ({ url: "/orders", params: queryParams }),
      // query: (queryParams) => ({ url: "/orders" }),
      transformResponse: (res, meta, queryParams) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
            ...res.data.map(({ id }) => ({ type: "ORDER", id })),
            { type: "ORDERS", id: "PARTIAL-LIST" },
          ]
          : [{ type: "ORDERS", id: "PARTIAL-LIST" }],
    }),
    getOrder: build.query({
      query: (id) => ({ url: `/orders/${id}` }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) => [{ type: "ORDER", id }],
    }),
    addOrder: build.mutation({
      query: (data) => ({
        url: "/orders/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error) =>
        res ? [{ type: "ORDERS", id: "PARTIAL-LIST" }] : [],
    }),
    updateOrder: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error, { id }) =>
        res ? [{ type: "ORDER", id }] : [],
    }),

    /* ORDERS ACTIONS */
    cancelOrder: build.mutation({
      query: (id) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        body: { status: "Canceled" },
      }),
      invalidatesTags: (res, error, id) => (res ? [{ type: "ORDER", id }] : []),
    }),
    approveQuotation: build.mutation({
      query: ({ id, ...status }) => ({
        url: `/orders/quotations/update/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (res, error, { orderID }) =>
        res ? [{ type: "ORDER", id: orderID }] : [],
    }),
    approveRejectMaterial: build.mutation({
      query: ({ id, ...status }) => ({
        url: `/orders/materials/update/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (res, error, { orderID }) =>
        res ? [{ type: "ORDER", id: orderID }] : [],
    }),
    approveRejectService: build.mutation({
      query: ({ id, ...status }) => ({
        url: `/orders/additional-services/update/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (res, error, { orderID }) =>
        res ? [{ type: "ORDER", id: orderID }] : [],
    }),
    // rejectMaterial: build.mutation({
    //   query: ({ id }) => ({
    //     url: `/orders/materials/reject/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: (res, error, { orderID }) =>
    //     res ? [{ type: "ORDER", id: orderID }] : [],
    // }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useApproveRejectServiceMutation,
  useCancelOrderMutation,
  useApproveQuotationMutation,
  useApproveRejectMaterialMutation,
  // useRejectMaterialMutation,
} = ordersAPI;
