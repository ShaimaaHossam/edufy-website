import { createSlice } from "@reduxjs/toolkit";
import { USER_TYPES } from "../../../constants/global";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    customerFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": USER_TYPES.customer,
    },
    teamMembersFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": USER_TYPES.teamMember,
    },
  },
  reducers: {
    setCustomerFilters: (state, { payload }) => {
      state.customerFilters = payload;
    },
    setTeamMembersFilters: (state, { payload }) => {
      state.teamMembersFilters = payload;
    },
  },
});

export const { setTeamMembersFilters, setCustomerFilters } =
  peopleSlice.actions;

export const peopleSelector = (state) => state.people;
