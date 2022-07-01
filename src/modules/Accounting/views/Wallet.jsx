import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography } from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";

import WalletOverview from "../components/WalletOverview";
import WalletTransTable from "../components/WalletTransTable";
import WalletTransFilters from "../components/WalletTransFilters";
import WalletWarningDialog from "../components/WalletWarningDialog";
import WalletDepositDialog from "../components/WalletDepositDialog";

function Wallet() {
  const { t } = useTranslation("accounting");

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("accounting"), url: "/accounting" }]} />

        <Typography component="h1" variant="h5">
          {t("accountWallet")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" mb={2}>
                {t("walletOverview")}
              </Typography>

              <WalletOverview />
            </Grid>

            <Grid item xs={12}>
              <Typography component="h2" variant="h6" mb={2}>
                {t("walletTransactions")}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <WalletTransFilters />
                </Grid>

                <Grid item xs={12}>
                  <WalletTransTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <WalletWarningDialog />
      <WalletDepositDialog />
    </Grid>
  );
}

export default Wallet;
