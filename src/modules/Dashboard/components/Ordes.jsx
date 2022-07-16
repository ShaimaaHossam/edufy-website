import { useState } from "react";

import { useGetTotalOrdersQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setOrdersFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Grid, Typography, Paper } from "@mui/material";

import Wallet from "./Wallet";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";

import { formatDate } from "../../../helpers/datetime";

import { Bar as OrdersBars } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function Orders({ allRoles, allProperties }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { t } = useTranslation("dashboard");

  const [userRole, setUserRole] = useState("");
  const [property, setProperty] = useState("");
  const [dates, setDates] = useState([]);

  const { ordersFilters } = useSelector(dashboardSelector);

  const dispatch = useDispatch();

  const { isLoading, data: allOrders } = useGetTotalOrdersQuery(ordersFilters);

  const totalOrders = allOrders?.data?.months.map(
    (item) => item.orders.total_orders
  );

  const openOrders = allOrders?.data?.months.map(
    (item) => item.orders.open_orders
  );

  const completedOrders = allOrders?.data?.months.map(
    (item) => item.orders.completed_orders
  );

  const cancelledOrders = allOrders?.data?.months.map(
    (item) => item.orders.cancelled_orders
  );

  const labels = allOrders?.data?.months.map(
    (item) => `${item.month}${item.year}`
  );

  const orders = [
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

  if (isLoading) return null;

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
            <Grid item xs={6} mr={1}>
              <DateRangePicker
                size="small"
                spacing={2}
                values={dates}
                onChange={(dates) => {
                  setDates(dates);
                  dispatch(
                    setOrdersFilters({
                      ...ordersFilters,
                      "filter[date_from]": dates[0] && formatDate(dates[0]),
                      "filter[date_to]": dates[1] && formatDate(dates[1]),
                    })
                  );
                }}
              />
            </Grid>

            <Grid item xs={2} mr={1}>
              <Autocomplete
                name="property filter"
                size="small"
                label={t("byProperty")}
                noOptionsText={t("noProperties")}
                options={allProperties?.map((type) => ({
                  value: type.id,
                  label: type.title,
                }))}
                value={property}
                onChange={(e) => {
                  setProperty(e.target.value);
                  dispatch(
                    setOrdersFilters({
                      ...ordersFilters,
                      "filter[property_id]": e.target.value,
                    })
                  );
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <Autocomplete
                name="roles filter"
                size="small"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={allRoles?.map((type) => ({
                  value: type.name,
                  label: type.name,
                }))}
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  dispatch(
                    setOrdersFilters({
                      ...ordersFilters,
                      "filter[user_role]": e.target.value,
                    })
                  );
                }}
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
              mt: 2,
            }}
          >
            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#ffaa17">
                {t("totalOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {allOrders.data.total_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#237df0">
                {t("openOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {allOrders.data.open_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#29bf56">
                {t("completedOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {allOrders.data.completed_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography component="p" variant="subtitle1" color="#98abbb">
                {t("cancelledOrders")}
              </Typography>
              <Typography component="p" variant="h6">
                {allOrders.data.cancelled_orders}
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
