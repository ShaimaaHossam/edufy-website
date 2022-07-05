import { useSelector, useDispatch } from "react-redux";
import {
  isWarningShownSelector,
  setWarningShown,
  toggleDepositDialog,
} from "../state/walletSlice";

import { useGetWalletOverviewQuery } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Grid, Box, Typography, Button } from "@mui/material";
import { mdiWalletPlusOutline } from "@mdi/js";

import Dialog from "../../../shared/components/Dialog";
import Icon from "../../../shared/components/Icon";

import walletWarnSvg from "../../../assets/svgs/charge_over.svg";

function WalletWarningDialog() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const isWarningShown = useSelector(isWarningShownSelector);

  const { isLoading, data: overview } = useGetWalletOverviewQuery();

  if (isLoading) return null;

  const percentage =
    (overview.current_balance / (overview.spending_limit + overview.deposits)) *
    100;

  if (percentage > 25) return null;

  return (
    <Dialog
      withoutTitle
      withoutConfirm
      size="medium"
      open={!isWarningShown}
      onClose={() => dispatch(setWarningShown())}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Box
            component="img"
            alt="wallet warning"
            src={walletWarnSvg}
            display="block"
            width={110}
            mt={5}
            mb={3}
          />
        </Grid>

        <Grid item>
          <Typography fontSize={18} align="center" px={4}>
            {t("walletWarningMessage")}
          </Typography>
        </Grid>

        <Grid item mt={3} mb={5}>
          <Button
            size="medium"
            startIcon={<Icon icon={mdiWalletPlusOutline} />}
            onClick={() => {
              dispatch(setWarningShown());
              dispatch(toggleDepositDialog());
            }}
          >
            {t("rechargeWallet")}
          </Button>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="text.secondary" align="center">
            {t("contactMessage")}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default WalletWarningDialog;
