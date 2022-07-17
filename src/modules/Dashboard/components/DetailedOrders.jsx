import { useState } from "react";

import { useGetTotalDetailsOrderQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setDetailsOrdersFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Grid, Typography, Paper } from "@mui/material";

import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";

import { formatDate } from "../../../helpers/datetime";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar as OrdersDetailsBars } from "react-chartjs-2";

function DetailedOrders({ allRoles, allProperties }) {
 
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

  const { detailsOrdersFilters } = useSelector(dashboardSelector);

  const { isLoading, data: allOrderDetails } = useGetTotalDetailsOrderQuery(detailsOrdersFilters);

  const dispatch = useDispatch();

  const labels = allOrderDetails?.data?.days.map((item) => item.date);

  const openOrders =allOrderDetails?.data?.days.map((item) => item.open_orders);

  const completedOrders =allOrderDetails?.data?.days.map(
    (item) => item.completed_orders
  );

  const cancelledOrders =allOrderDetails?.data?.days.map(
    (item) => item.cancelled_orders
  );

  const data = {
    labels,
    datasets: [
      {
        label: t("openOrders"),
        data: openOrders,
        backgroundColor: "#237df0",
      },
      {
        label: t("completedOrders"),
        data: completedOrders,
        backgroundColor: "#29bf56",
      },
      {
        label: t("cancelledOrders"),
        data: cancelledOrders,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  if (isLoading) return null;

  return (
    <Paper sx={{ p: 5, mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              {t("detailedOrders")}
            </Typography>
          </Grid>

          <Grid item container xs={12}>
            <Grid item xs={5} mr={3}>
              <DateRangePicker
                size="small"
                spacing={2}
                values={dates}
                onChange={(dates) => {
                  setDates(dates);
                  dispatch(
                    setDetailsOrdersFilters({
                      ...detailsOrdersFilters,
                      "filters[date_from]": dates[0] && formatDate(dates[0]),
                      "filters[date_to]": dates[1] && formatDate(dates[1]),
                    })
                  );
                }}
              />
            </Grid>

            <Grid item xs={3} mr={3}>
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
                    setDetailsOrdersFilters({
                      ...detailsOrdersFilters,
                      "filters[property_id]": e.target.value,
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
                    setDetailsOrdersFilters({
                      ...detailsOrdersFilters,
                      "filters[user_role]": e.target.value,
                    })
                  );
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <OrdersDetailsBars options={options} data={data} />
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
              <Typography component="h4" variant="subtitle1" color="#98abbb">
                {t("totalOrders")}
              </Typography>
              <Typography component="h4" variant="h6">
                {allOrderDetails.data.total_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography component="h4" variant="subtitle1" color="#237df0">
                {t("openOrders")}
              </Typography>
              <Typography component="h4" variant="h6">
                {allOrderDetails.data.open_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography component="h4" variant="subtitle1" color="#29bf56">
                {t("completedOrders")}
              </Typography>
              <Typography component="h4" variant="h6">
                {allOrderDetails.data.completed_orders}
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center">
              <Typography
                component="h4"
                variant="subtitle1"
                color="rgb(255, 99, 132)"
              >
                {t("cancelledOrders")}
              </Typography>
              <Typography component="h4" variant="h6">
                {allOrderDetails.data.cancelled_orders}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DetailedOrders;
