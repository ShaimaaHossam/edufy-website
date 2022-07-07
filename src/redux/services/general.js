import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const generalAPI = createApi({
  reducerPath: "generalAPI",
  refetchOnReconnect: true,
  tagTypes: ["SERVICES-TREE", "SERVICES-LIST"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllCities: build.query({
      query: () => ({ url: "/cities", params: { listing: "1" } }),
      transformResponse: (res) => res.data,
    }),
    getAllUsedCities: build.query({
      query: (companyID) => ({
        url: `/cities/${companyID}`,
        params: { listing: "1" },
      }),
      transformResponse: (res) => res.data,
    }),

    getCompanyServicesTree: build.query({
      query: () => ({ url: "/companies/services" }),
      transformResponse: (res) => res.data,
      providesTags: (res) => (res ? [{ type: "SERVICES-TREE" }] : []),
    }),
    getAllCompanyServices: build.query({
      query: () => ({
        url: "/companies/services",
        params: { listing: "1" },
      }),
      transformResponse: (res) => res.data,
      providesTags: (res) => (res ? [{ type: "SERVICES-LIST" }] : []),
    }),
    updateCompanyServices: build.mutation({
      query: (data) => ({
        url: "companies/services/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (res) =>
        res ? [{ type: "SERVICES-TREE" }, { type: "SERVICES-LIST" }] : [],
    }),

    getPropertyServicesTree: build.query({
      query: (id) => ({
        url: "/properties/services",
        params: { "filter[property_id]": id },
      }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) =>
        res ? [{ type: "SERVICES-TREE", id }] : [],
    }),
    getAllPropertyServices: build.query({
      query: (id) => ({
        url: "/properties/services",
        params: { listing: "1", "filter[property_id]": id },
      }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) =>
        res ? [{ type: "SERVICES-LIST", id }] : [],
    }),
    updatePropertyServices: build.mutation({
      query: ({ id, data }) => ({
        url: `properties/services/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (res, error, { id }) =>
        res
          ? [
            { type: "SERVICES-TREE", id },
            { type: "SERVICES-LIST", id },
          ]
          : [],
    }),

    getNotifications: build.query({
      query: (page) => ({
        url: "/notifications",
        params: { perPage: 20, page },
      }),
      transformResponse: (res) => res.data,
    }),
    markNotificationRead: build.mutation({
      query: ({ id }) => ({ url: `notifications/read/${id}`, method: "POST" }),
    }),

    uploadFiles: build.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file, idx) => formData.append(`file[${idx}]`, file));

        return { url: "/actions/upload", method: "POST", body: formData };
      },
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
  useGetAllUsedCitiesQuery,

  useGetCompanyServicesTreeQuery,
  useGetAllCompanyServicesQuery,
  useUpdateCompanyServicesMutation,

  useGetPropertyServicesTreeQuery,
  useGetAllPropertyServicesQuery,
  useUpdatePropertyServicesMutation,

  useUploadFilesMutation,

  useLazyGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = generalAPI;
