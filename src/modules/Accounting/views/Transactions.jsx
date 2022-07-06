import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/transactionsSlice";

import { useLazyDownloadTransactionsSheetQuery } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Button, Collapse } from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiTune, mdiMicrosoftExcel } from "@mdi/js";

import TransactionsTable from "../components/TransactionsTable";
import TransactionsFilters from "../components/TransactionsFilters";

import { downloadFile } from "../../../helpers/routing";
import { formatDate, formats } from "../../../helpers/datetime";

function Transactions() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

  const [downloadTransactionsSheet] = useLazyDownloadTransactionsSheetQuery();

  const [filtersShown, setFiltersShown] = useState(false);

  const formatToday = () => formatDate(new Date(), formats.dateShort);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("accounting"), url: "/accounting" }]} />

        <Typography component="h1" variant="h5">
          {t("transactions")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 320 }}>
              <SearchInput
                size="small"
                label={t("searchTransactions")}
                placeholder={t("searchTransactionsPlaceholder")}
                onChange={(keyword) =>
                  dispatch(
                    setFilters({ ...filters, "filter[keyword]": keyword })
                  )
                }
              />
            </Grid>

            <Grid item>
              <IconButton
                aria-label="toggle filters visibility"
                icon={mdiTune}
                size="large"
                shape="rounded"
                variant="contained"
                color={filtersShown ? "primary" : "default"}
                onClick={(e) => setFiltersShown(!filtersShown)}
              />
            </Grid>

            <Grid item sx={{ ml: "auto" }}>
              <Button
                startIcon={<Icon icon={mdiMicrosoftExcel} />}
                onClick={() =>
                  downloadTransactionsSheet()
                    .unwrap()
                    .then((data) =>
                      downloadFile(data, `transactions_${formatToday()}.xlsx`)
                    )
                }
              >
                {t("downloadTransactions")}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Collapse in={filtersShown}>
                <TransactionsFilters />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <TransactionsTable />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Transactions;
