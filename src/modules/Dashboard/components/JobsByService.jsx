import { Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar as OrdersBars } from "react-chartjs-2";
import { servicesReqRes } from "../dashboardData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function JobsByService() {
  const { t } = useTranslation("dashboard");

  const labels = servicesReqRes.map((item) => item.service_type);
  const orders = servicesReqRes.map((item) => item.total_orders);
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
