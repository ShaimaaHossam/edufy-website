import { createSlice } from "@reduxjs/toolkit";
import { USER_TYPES } from "../../../constants/global";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    customerFilters: {
      page: 1,
      perPage: 20,
      "filter[user_type]": "customer"
    },
    teamMembersFilters: {
      "filter[user_type]": USER_TYPES.teamMember
    },
  },
  reducers: {
    setPeopleFilters: (state, { payload }) => {
      state.peopleFilters = payload;
    },
    setTeamMembersFilters: (state, {payload})=>{
      state.teamMembersFilters = payload;
    }
  },
});

export const { setPeopleFilters, setTeamMembersFilters } = peopleSlice.actions;

export const peopleSelector = (state) => state.people;
