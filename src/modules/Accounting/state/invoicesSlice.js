import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    filters: FILTERS_INIT_STATE,
    invoiceToReject: null,
    invoiceToPay: null,
  },
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    clearFilters: (state) => {
      state.filters = FILTERS_INIT_STATE;
    },
    setInvoiceToReject: (state, { payload }) => {
      state.invoiceToReject = payload;
    },
    setInvoiceToPay: (state, { payload }) => {
      state.invoiceToPay = payload;
    },
  },
});

export const { setFilters, clearFilters, setInvoiceToReject, setInvoiceToPay } =
  invoicesSlice.actions;

export const filtersSelector = (state) => state.invoices.filters;
export const invoiceToRejectSelector = (state) =>
  state.invoices.invoiceToReject;
export const invoiceToPaySelector = (state) => state.invoices.invoiceToPay;
