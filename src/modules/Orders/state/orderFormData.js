import { createSlice } from "@reduxjs/toolkit";

export const orderFormDataSlice = createSlice({
    name: "orderFormData",
    initialState: {
        //
        type: "",
        // *** Select Property / units
        selectedPropertyId: "",
        selectedUnits: [],
        categories: [],
        editService: true,
        selectedServiceIdxToEdit: null,
    },
    reducers: {
        updateVal(state, { payload: { key, val } }) {
            state[key] = val;
        },
        updateCategory(state, { payload: { index, val } }) {
            state.categories[index] = val;
        },
        deleteCategory(state, { payload }) {
            state.categories.splice(payload, 1);
        },
        addSubServices(state, { payload: { subService } }) {
            state.subServices.push(subService);
        },
        resetAllStatus(state) {
            state.type = "";
            state.selectedPropertyId = "";
            state.selectedUnits = [];
            state.categories = [];
            state.editService = true;
            state.selectedServiceIdxToEdit = null;
        }
    },
})
export const { updateVal, updateCategory, deleteCategory, resetAllStatus } = orderFormDataSlice.actions;
export const orderFormDataSelector = (state) => state.orderFormData;