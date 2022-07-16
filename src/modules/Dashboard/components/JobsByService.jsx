import { useGetTotalOrdersByServiceQuery } from "../../../redux/services/dashboard";

import { useTranslation } from "react-i18next";

import { Typography, Paper } from "@mui/material";

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

function JobsByService() {
  const { t } = useTranslation("dashboard");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { isLoading, data: totalOrders } = useGetTotalOrdersByServiceQuery();

  const labels = totalOrders?.data?.map((item) => item.service_type);

  const orders = totalOrders?.data?.map((item) => item.total_orders);

  const datasets = [
    {
      data: orders,
      label: t("numberOfOrders"),
      borderWidth: 1,
      barThickness: 30,
      maxBarThickness: 20,
      backgroundColor: "#237df0",
    },
  ];

  const data = {
    labels,
    datasets,
  };

  if (isLoading) return null;

  return (
    <Paper sx={{ p: 5, mt: 4 }}>
      <Typography component="h1" variant="h5">
        {t("serviceType")}
      </Typography>
      <OrdersBars data={data} />
    </Paper>
  );
}

export default JobsByService;
