import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  currentStep: 1,
  canLeave: false,
  stepsData: {
    1: { data: null, errors: null },
    2: { data: null, errors: null },
  },
};

export const propertyFormStepperSlice = createSlice({
  name: "propertyFormStepper",
  initialState: INIT_STATE,
  reducers: {
    setStepData: (state, { payload }) => {
      const { step, data } = payload;
      state.stepsData[step] = { ...state.stepsData[step], ...data };
    },
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
    setCanLeave: (state, { payload }) => {
      state.canLeave = payload;
    },
    clearStepper: (state) => {
      state.currentStep = INIT_STATE.currentStep;
      state.stepsData = INIT_STATE.stepsData;
    },
  },
});

export const { setStepData, setCurrentStep, setCanLeave, clearStepper } =
  propertyFormStepperSlice.actions;

export const stepperSelector = (state) => state.propertyFormStepper;
