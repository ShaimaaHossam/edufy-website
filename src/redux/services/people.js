import { createApi } from "@reduxjs/toolkit/query/react";

import { customBaseQuery } from "../helpers/baseQuery";

export const peopleAPI = createApi({
  reducerPath: "peopleAPI",
  refetchOnReconnect: true,
  tagTypes: ["People"],
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
    }),

    getAllUsersByRole: build.query({
      query: (role) => ({
        url: "/users",
        params: { listing: "1", role },
      }),
      transformResponse: (res) => res.data,
    }),

    getUsers: build.query({
      query: (userType) => ({
        url: "/peoples",
        params: { ...userType },
      }),
      transformResponse: (res) => ({
        data: res.data,
        meta: res.meta,
      }),
      providesTags: (res, err, queryParams) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "People", id })),
              { type: "People", id: "PARTIAL-LIST" },
            ]
          : [{ type: "People", id: "PARTIAL-LIST" }],
    }),
    getUser: build.query({
      query: (id) => ({ url: `/peoples/${id}` }),
      transformResponse: (res) => res.data,
      providesTags: (res, err, id) => [{ type: "People", id }],
    }),

    addTeamMember: build.mutation({
      query: (data) => ({
        url: "/peoples/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: "People", id: "PARTIAL-LIST" }],
    }),

    addCustomer: build.mutation({
      query: (data) => ({
        url: "/peoples/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: "People", id: "PARTIAL-LIST" }],
    }),

    updateUser1: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/peoples/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "People", id },
        { type: "People", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetAllUsersByRoleQuery,
  useGetUsersQuery,
  useAddTeamMemberMutation,
  useAddCustomerMutation,
  useGetUserQuery,
  useUpdateUser1Mutation,
} = peopleAPI;
