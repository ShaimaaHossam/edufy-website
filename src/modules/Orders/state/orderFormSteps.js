import { createSlice } from "@reduxjs/toolkit";

export const orderFormStepsSlice = createSlice({
    name: "orderFormSteps",
    initialState: {
        currentStep: 1,
    },
    reducers: {
        incrementSteps: (state) => {
            if (state.currentStep < 3) {
                state.currentStep++;
            }

        },
        decrementSteps: (state) => {
            if (state.currentStep > 0) {
                state.currentStep--;
            }
        },
        resetSteps: (state) => {
            state.currentStep = 1;
        },
    },
})
export const { incrementSteps, decrementSteps, resetSteps } = orderFormStepsSlice.actions;
export const orderFormStepsSelector = (state) => state.orderFormSteps;