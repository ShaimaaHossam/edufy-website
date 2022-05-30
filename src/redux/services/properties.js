import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const propertiesAPI = createApi({
  reducerPath: "propertiesAPI",
  refetchOnReconnect: true,
  tagTypes: ["Properties"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getProperties: build.query({
      query: (queryParams) => ({ url: "/properties", params: queryParams }),
      transformResponse: (res, meta, queryParams) => ({
        data: res.data,
        meta: res.meta,
        currentFilters: queryParams,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Properties", id })),
              { type: "Properties", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Properties", id: "PARTIAL-LIST" }],
    }),

    getProperty: build.query({
      query: (id) => ({ url: `/properties/${id}` }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) => [{ type: "Properties", id }],
    }),

    addProperty: build.mutation({
      query: (data) => ({
        url: "/properties/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: "Properties", id: "PARTIAL-LIST" }],
    }),

    updateProperty: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/properties/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Properties", id },
        { type: "Properties", id: "PARTIAL-LIST" },
      ],
    }),

    getAllPropertyTypes: build.query({
      query: () => ({ url: "/properties/types", params: { listing: "1" } }),
      transformResponse: (res) => res.data,
    }),

    getAllPropertySubtypes: build.query({
      query: (typeID) => ({
        url: `/properties/types/${typeID}`,
        params: { listing: "1" },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,

  useGetAllPropertyTypesQuery,
  useGetAllPropertySubtypesQuery,
} = propertiesAPI;
