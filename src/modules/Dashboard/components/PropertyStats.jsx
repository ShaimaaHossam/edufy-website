import {
  useGetPropertyStateQuery,
} from "../../../redux/services/dashboard";

import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { Typography, Paper, Grid } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";

import { propertyStateReqRes } from "../dashboardData";

function PropertyStats() {
  const { t } = useTranslation("dashboard");
  
  const { isLoading, data: propertyState } = useGetPropertyStateQuery();

  const dispatch = useDispatch();

  const tableLabels = [
    t("propertyName"),
    t("unit"),
    t("createdBy"),
    t("totalOrders"),
    t("openOrders"),
    t("completedOrders"),
    t("cost"),
  ];

  const tableData = propertyState?.data?.map((item) => ({
    id: item.id,
    clickable: false,
    active: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.property.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.unit.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.created_by.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.total_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.open_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.completed_orders}
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
            {t("propertyStats")}
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
            tableLabel="Property Stats List"
            headLabels={tableLabels}
            rowsData={tableData}
            metadata={{
              total: propertyStateReqRes.meta.total,
              pages: propertyStateReqRes.meta.lastPage,
              perPage: propertyStateReqRes.meta.perPage,
              currentPage: propertyStateReqRes.meta.currentPage,
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

export default PropertyStats;
