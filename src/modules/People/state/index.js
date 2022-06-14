import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    customerFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": "customer"
    },
    teamMembersFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": "team_member"
      
    },
  },
  reducers: {
    setPeopleFilters: (state, { payload }) => {
      state.peopleFilters = payload;
    },
  },
});

export const { setPeopleFilters } = peopleSlice.actions;

export const peopleSelector = (state) => state.people;
