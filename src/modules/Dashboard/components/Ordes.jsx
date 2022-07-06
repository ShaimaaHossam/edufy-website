import React from "react";
import Wallet from "./Wallet";
import { Grid, Typography, Paper } from "@mui/material";

import { useTranslation } from "react-i18next";

import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import { Bar as OrdersBars } from "react-chartjs-2";
import { ordersReqRes } from "../dashboardData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Orders() {
  const { t } = useTranslation("dashboard");

  const totalOrders = ordersReqRes.months.map(
    (item) => item.orders.total_orders
  );
  const openOrders = ordersReqRes.months.map((item) => item.orders.open_orders);
  const completedOrders = ordersReqRes.months.map(
    (item) => item.orders.completed_orders
  );
  const cancelledOrders = ordersReqRes.months.map(
    (item) => item.orders.cancelled_orders
  );

  let orders = [
    {
      label: t("totalOrders"),
      data: totalOrders,
    },
    {
      label: t("openOrders"),
      data: openOrders,
    },
    {
      label: t("completedOrders"),
      data: completedOrders,
    },
    {
      label: t("cancelledOrders"),
      data: cancelledOrders,
    },
  ];
  const backgroundColors = ["#ffaa17", "#237df0", "#29bf56", "#98abbb"];
  const options = {
    borderWidth: 1,
    barThickness: 20,
    maxBarThickness: 10,
  };

  const datasets = orders.map((item, index) => ({
    ...item,
    ...options,
    backgroundColor: backgroundColors[index],
  }));

  const labels = ordersReqRes.months.map(
    (item) =>`${item.month}${item.year}`
  );

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container spacing={3}>
        <Grid item container xs={8} spacing={3}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              {t("totalOrders")}
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item sx={{ width: 135, marginRight: 3 }}>
              <Autocomplete
                name="roles filter"
                size="small"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={[]}
                value={[]}
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item sx={{ width: 135, marginRight: 3 }}>
              <Autocomplete
                name="roles filter"
                size="small"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={[]}
                value={[]}
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item sx={{ width: 135, marginRight: 3 }}>
              <Autocomplete
                name="property filter"
                size="small"
                label={t("byProperty")}
                noOptionsText={t("noTypes")}
                options={[]}
                value={[]}
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item sx={{ width: 135 }}>
              <Autocomplete
                name="roles filter"
                size="small"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={[]}
                value={[]}
                onChange={(e) => {}}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <OrdersBars
              data={{
                labels,
                datasets,
              }}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            sx={{
              border: 3,
              borderColor: "#fafbff",
              borderRadius: "10px",
              mt:2
            }}
            
          >
            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#ffaa17">
                {t("totalOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {ordersReqRes.total_orders}
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#237df0">
                {t("openOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {ordersReqRes.open_orders}
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#29bf56">
                {t("completedOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {ordersReqRes.completed_orders}
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#98abbb">
                {t("cancelledOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {ordersReqRes.cancelled_orders}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Wallet />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Orders;
