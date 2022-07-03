import { createSlice } from "@reduxjs/toolkit";

export const orderFormDataSlice = createSlice({
    name: "orderFormData",
    initialState: {
        //
        type: "",
        // *** Select Property / units
        selectedPropertyId: "",
        selectedUnits: [],


        // *** Select Services
        // service type
        selectedServiceType: null,

        // select Item
        allItems: [],
        selectedItem: null,

        // select Item Type
        allItemTypes: [],
        selectedItemType: null,


        // select service
        allSubServices: [],
        selectedSubServices: null,
        quantity: 1,
        unitCost: 0,
        totalCost: 0,

        // Schedule Service
        visitDate: '',
        visitTime: null,

        subServiceId: 1,
        subServices: [],

        servicesId: 1,
        services: []
    },
    reducers: {
        updateVal(state, { payload: { key, val } }) {
            state[key] = val;
        },
        addSubServices(state, { payload: { subService } }) {
            state.subServices.push(subService);
        },

    },
})
export const { updateVal, createState } = orderFormDataSlice.actions;
export const orderFormDataSelector = (state) => state.orderFormData;