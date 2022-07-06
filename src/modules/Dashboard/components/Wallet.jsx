import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { walletReqRes } from "../dashboardData";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [walletReqRes.total_spendings, walletReqRes.current_balance],
      backgroundColor: ["#29bf56", "#237df0"],
      borderColor: ["#29bf56", "#237df0"],
      borderWidth: 1,
      cutout: "80%",
    },
  ],
};

function Wallet() {
  const { t } = useTranslation("dashboard");

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
        <Typography component="p" variant="subtitle2" mb={2}>
          {t("accountCapacity")}
        </Typography>
        <Typography component="p" variant="h6">
          {`${walletReqRes.spendings_limit} ${t("sr")}`}
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
        <Typography component="p" variant="subtitle2" mb={2}>
          {t("deposit")}
        </Typography>
        <Typography component="p" variant="h6">
          {`${walletReqRes.deposits} ${t("sr")}`}
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
        <Typography component="p" variant="subtitle2" mb={2} color="#237df0">
          {t("availableBlance")}
        </Typography>
        <Typography component="p" variant="h6">
          {`${walletReqRes.current_balance} ${t("sr")}` }
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
        <Typography component="p" variant="subtitle2" mb={2} color="#29bf56">
          {t("totalSpending")}
        </Typography>
        <Typography component="p" variant="h6">
          {`${walletReqRes.total_spendings} ${t("sr")}`}
        </Typography>
      </Grid>

      <Grid item m="auto" xs={8}>
        <Doughnut data={data} />
      </Grid>
    </Grid>
  );
}

export default Wallet;
