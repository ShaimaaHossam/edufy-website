import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../../config";

import { buildURLQueryParams } from "../../helpers/routing";

import { loggedout } from "../slices/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
  paramsSerializer: buildURLQueryParams,
});

export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(loggedout());
  }
  return result;
};
