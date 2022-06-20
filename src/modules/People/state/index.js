import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLES } from "../../../constants/system";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    customerFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": USER_ROLES.customer,
    },
    teamMembersFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": USER_ROLES.teamMember,
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
