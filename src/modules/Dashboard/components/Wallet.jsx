import { useGetWalletOverviewQuery } from "../../../redux/services/dashboard";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


function Wallet() {
  const { t } = useTranslation("dashboard");

  ChartJS.register(ArcElement, Tooltip, Legend);

  const { isLoading, data: walletOverview } = useGetWalletOverviewQuery();

  const data = {
    datasets: [
      {
        data: [
          walletOverview?.data?.total_spending,
          walletOverview?.data?.current_balance,
        ],
        backgroundColor: ["#29bf56", "#237df0"],
        borderColor: ["#29bf56", "#237df0"],
        borderWidth: 1,
        cutout: "80%",
      },
    ],
  };

  if (isLoading) return null;

  return (
    <Grid container>
      <Grid
        item
        sx={{
          borderRightStyle: "dashed",
          borderBottomStyle: "dashed",
          borderRightColor: "#fafbff",
          borderBottomColor: "#fafbff",
          textAlign: "center",
          padding: 2,
          width: "50%",
        }}
      >
        <Typography component="h6" variant="subtitle2" mb={2}>
          {t("accountCapacity")}
        </Typography>
        <Typography component="h6" variant="h6">
          {`${walletOverview.data.spending_limit} ${t("sr")}`}
        </Typography>
      </Grid>

      <Grid
        item
        sx={{
          borderBottomStyle: "dashed",
          borderBottomColor: "#fafbff",
          textAlign: "center",
          padding: 2,
          width: "50%",
        }}
      >
        <Typography component="h6" variant="subtitle2" mb={2}>
          {t("deposit")}
        </Typography>
        <Typography component="h6" variant="h6">
          {`${walletOverview.data.deposits} ${t("sr")}`}
        </Typography>
      </Grid>

      <Grid
        item
        sx={{
          borderRightStyle: "dashed",
          borderRightColor: "#fafbff",
          textAlign: "center",
          padding: 2,
          width: "50%",
        }}
      >
        <Typography component="h6" variant="subtitle2" mb={2} color="#237df0">
          {t("availableBlance")}
        </Typography>
        <Typography component="h6" variant="h6">
          {`${walletOverview.data.current_balance} ${t("sr")}`}
        </Typography>
      </Grid>

      <Grid
        item
        sx={{
          textAlign: "center",
          padding: 2,
          width: "50%",
        }}
      >
        <Typography component="h6" variant="subtitle2" mb={2} color="#29bf56">
          {t("totalSpending")}
        </Typography>
        <Typography component="h6" variant="h6">
          {`${walletOverview.data.total_spending} ${t("sr")}`}
        </Typography>
      </Grid>

      <Grid item m="auto" xs={8}>
        <Doughnut data={data} />
      </Grid>
    </Grid>
  );
}

export default Wallet;
