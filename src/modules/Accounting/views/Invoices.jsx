import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/invoicesSlice";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Collapse } from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import IconButton from "../../../shared/components/IconButton";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiTune } from "@mdi/js";

import InvoicesTable from "../components/InvoicesTable";
import InvoicesFilters from "../components/InvoicesFilters";

function Invoices() {
  const { t } = useTranslation("accounting");

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("accounting"), url: "/accounting" }]} />

        <Typography component="h1" variant="h5">
          {t("invoices")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 280 }}>
              <SearchInput
                size="small"
                label={t("searchInvoices")}
                placeholder={t("invoiceNumber")}
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
                size="medium"
                shape="rounded"
                variant="contained"
                color={filtersShown ? "primary" : "default"}
                onClick={(e) => setFiltersShown(!filtersShown)}
              />
            </Grid>

            <Grid item xs={12}>
              <Collapse in={filtersShown}>
                <InvoicesFilters />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <InvoicesTable />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Invoices;
