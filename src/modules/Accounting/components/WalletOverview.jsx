import { useGetWalletOverviewQuery } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  linearProgressClasses,
  LinearProgress as MuiLinearProgress,
} from "@mui/material";
import { mdiWalletPlusOutline } from "@mdi/js";

import Icon from "../../../shared/components/Icon";

import WalletWarningDialog from "../components/WalletWarningDialog";

const LinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.common.white,
  [`& .${linearProgressClasses.bar}`]: { borderRadius: 5 },
}));

function WalletOverview() {
  const { t } = useTranslation("accounting");

  const { isLoading, data: overview } = useGetWalletOverviewQuery();

  if (isLoading) return null;

  const percentage =
    (overview.current_balance /
      (overview.spendings_limit + overview.deposits)) *
    100;

  return (
    <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "greyScale.500" }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs container spacing={4} alignItems="flex-end">
          <Grid item>
            <Typography variant="h6" color="text.secondary">
              {t("currentBalance")}
            </Typography>
            <Typography component="span" variant="h6">
              {overview.current_balance.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: "4px" }}
            >
              {t("capacityLimit")}
            </Typography>
            <Typography component="span" variant="subtitle1">
              {overview.spendings_limit.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: "4px" }}
            >
              {t("deposits")}
            </Typography>
            <Typography component="span" variant="subtitle1">
              {overview.deposits.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: "4px" }}
            >
              {t("spendings")}
            </Typography>
            <Typography component="span" variant="subtitle1">
              {overview.total_spendings.toFixed(2)} {t("sr")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Button size="large" startIcon={<Icon icon={mdiWalletPlusOutline} />}>
            {t("rechargeWallet")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            color={
              percentage <= 25
                ? "error"
                : percentage <= 40
                ? "warning"
                : percentage <= 75
                ? "info"
                : "success"
            }
          />
          <Typography
            component="span"
            display="block"
            variant="subtitle1"
            color="primary.main"
            align="right"
          >
            {(overview.spendings_limit + overview.deposits).toFixed(2)}{" "}
            {t("sr")}
          </Typography>
        </Grid>
      </Grid>

      <WalletWarningDialog />
    </Box>
  );
}

export default WalletOverview;
