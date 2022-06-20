import { useState } from "react";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { ordersSelector, setFilters } from "../../../redux/slices/orders";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Button, Collapse } from "@mui/material";

import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiTune, mdiPlus } from "@mdi/js";

import OrdersTable from "../../../shared/components/modules/orders/OrdersTable";
import OrdersFilters from "../../../shared/components/modules/orders/OrdersFilters";

function Orders() {
  const { t } = useTranslation("orders");

  const { orderType } = useParams();

  const dispatch = useDispatch();
  const { filters } = useSelector(ordersSelector);

  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h5">
          {t(`${orderType}Orders`)}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 320 }}>
              <SearchInput
                size="small"
                label={t("searchOrders")}
                placeholder={t("searchOrdersPlaceholder")}
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
                startIcon={<Icon icon={mdiPlus} />}
                component={Link}
                to="/orders/maintenance/add"
              >
                {t("addOrder")}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Collapse in={filtersShown}>
                <OrdersFilters />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <OrdersTable orderType={orderType} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Orders;
