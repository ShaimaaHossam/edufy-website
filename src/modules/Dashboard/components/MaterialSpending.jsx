import { useGetMaterialSpendingQuery } from "../../../redux/services/dashboard";

import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { Typography, Paper, Grid } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";

// import { materialSpendingReqRes } from "../dashboardData";

function MaterialSpending() {
  const { t } = useTranslation("dashboard");
  
  const { isLoading, data: materialSpending } = useGetMaterialSpendingQuery();

  const dispatch = useDispatch();

  const tableLabels = [
    t("propertyName"),
    t("service"),
    t("subService"),
    t("numberOfOrders"),
    t("completedOrders"),
    t("vistOrders"),
    t("cost"),
  ];

  const tableData = materialSpending?.data?.map((item) => ({
    id: item.id,
    clickable: false,
    active: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.property.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.service.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.sub_service.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.total_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.completed_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.visted_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.total_cost}
      </Typography>,
    ],
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Paper sx={{ p: 5, mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {t("materialSpending")}
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item sx={{ width: 210, marginRight: 3 }}>
            <Autocomplete
              name="roles filter"
              size="small"
              label={t("byUserRole")}
              noOptionsText={t("noTypes")}
              options={[]}
              value={[]}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item sx={{ width: 210, marginRight: 3 }}>
            <Autocomplete
              name="roles filter"
              size="small"
              label={t("byUserRole")}
              noOptionsText={t("noTypes")}
              options={[]}
              value={[]}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item sx={{ width: 210, marginRight: 3 }}>
            <Autocomplete
              name="property filter"
              size="small"
              label={t("byProperty")}
              noOptionsText={t("noTypes")}
              options={[]}
              value={[]}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item sx={{ width: 210 }}>
            <Autocomplete
              name="roles filter"
              size="small"
              label={t("byUserRole")}
              noOptionsText={t("noTypes")}
              options={[]}
              value={[]}
              onChange={(e) => {}}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table
            tableLabel="Material Spending List"
            headLabels={tableLabels}
            rowsData={tableData}
            metadata={{
              total: materialSpending.meta.total,
              pages: materialSpending.meta.lastPage,
              perPage: materialSpending.meta.perPage,
              currentPage: materialSpending.meta.currentPage,
            }}
            onPageChange={(page, perPage) => dispatch()}
          />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <NoContent />
  );
}

export default MaterialSpending;
