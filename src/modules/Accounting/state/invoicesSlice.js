import { createSlice } from "@reduxjs/toolkit";

const FILTERS_INIT_STATE = { page: 1, perPage: 20 };

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    filters: FILTERS_INIT_STATE,
    invoiceToReport: null,
    invoiceToPay: null,
  },
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    clearFilters: (state) => {
      state.filters = FILTERS_INIT_STATE;
    },
    setInvoiceToPay: (state, { payload }) => {
      state.invoiceToPay = payload;
    },
    setInvoiceToReport: (state, { payload }) => {
      state.invoiceToReport = payload;
    },
  },
});

export const { setFilters, clearFilters, setInvoiceToReport, setInvoiceToPay } =
  invoicesSlice.actions;

export const filtersSelector = (state) => state.invoices.filters;
export const invoiceToPaySelector = (state) => state.invoices.invoiceToPay;
export const invoiceToReportSelector = (state) =>
  state.invoices.invoiceToReport;
