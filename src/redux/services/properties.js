import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const propertiesAPI = createApi({
  reducerPath: "propertiesAPI",
  refetchOnReconnect: true,
  tagTypes: ["PROPERTY", "UNIT"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    /** PROPERTIES SECTION **/
    getProperties: build.query({
      query: (queryParams) => ({ url: "/properties", params: queryParams }),
      transformResponse: (res, meta, queryParams) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "PROPERTY", id })),
              { type: "PROPERTY", id: "PARTIAL-LIST" },
            ]
          : [{ type: "PROPERTY", id: "PARTIAL-LIST" }],
    }),
    getProperty: build.query({
      query: (id) => ({ url: `/properties/${id}` }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) => [{ type: "PROPERTY", id }],
    }),
    addProperty: build.mutation({
      query: (data) => ({
        url: "/properties/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error) =>
        res ? [{ type: "PROPERTY", id: "PARTIAL-LIST" }] : [],
    }),
    updateProperty: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/properties/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error, { id }) =>
        res
          ? [
              { type: "PROPERTY", id },
              { type: "PROPERTY", id: "PARTIAL-LIST" },
            ]
          : [],
    }),

    /** UNITS SECTION **/
    getUnits: build.query({
      query: (queryParams) => ({ url: "/units", params: queryParams }),
      transformResponse: (res, meta, queryParams) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "UNIT", id })),
              { type: "UNIT", id: "PARTIAL-LIST" },
            ]
          : [{ type: "UNIT", id: "PARTIAL-LIST" }],
    }),
    getUnit: build.query({
      query: (id) => ({ url: `/units/${id}` }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) => [{ type: "UNIT", id }],
    }),
    addUnit: build.mutation({
      query: (data) => ({
        url: "/units/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error, { id }) =>
        res ? [{ type: "UNIT", id: "PARTIAL-LIST" }] : [],
    }),
    updateUnit: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/unit/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (res, error, { id }) =>
        res
          ? [
              { type: "PROPERTY", id },
              { type: "PROPERTY", id: "PARTIAL-LIST" },
            ]
          : [],
    }),

    /** PROPERTY TYPES SECTION **/
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

    /** UNIT TYPES SECTION **/
    getAllUnitTypes: build.query({
      query: () => ({ url: "/units/types", params: { listing: "1" } }),
      transformResponse: (res) => res.data,
    }),
    getAllUnitSubtypes: build.query({
      query: (typeID) => ({
        url: `/units/types/${typeID}`,
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

  useGetUnitsQuery,
  useGetUnitQuery,
  useAddUnitMutation,
  useUpdateUnitMutation,

  useGetAllPropertyTypesQuery,
  useGetAllPropertySubtypesQuery,

  useGetAllUnitTypesQuery,
  useGetAllUnitSubtypesQuery,
} = propertiesAPI;
