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
        url: `/orders/cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: (res, error, id) => (res ? [{ type: "ORDER", id }] : []),
    }),
    approveMaterial: build.mutation({
      query: ({ id }) => ({
        url: `/orders/materials/approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: (res, error, { orderID }) =>
        res ? [{ type: "ORDER", id: orderID }] : [],
    }),
    rejectMaterial: build.mutation({
      query: ({ id }) => ({
        url: `/orders/materials/reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: (res, error, { orderID }) =>
        res ? [{ type: "ORDER", id: orderID }] : [],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,

  useCancelOrderMutation,
  useApproveMaterialMutation,
  useRejectMaterialMutation,
} = ordersAPI;
