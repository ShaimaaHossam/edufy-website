import { useState } from "react";

import { useGetMaterialSpendingQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setMaterialSpendingFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Typography, Paper, Grid } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";

import { formatDate } from "../../../helpers/datetime";

function MaterialSpending({ allRoles, allProperties }) {
  const { t } = useTranslation("dashboard");

  const [userRole, setUserRole] = useState("");
  const [property, setProperty] = useState("");
  const [dates, setDates] = useState([]);

  const { materialSpendingFilters } = useSelector(dashboardSelector);

  const { isLoading, data: materialSpending } = useGetMaterialSpendingQuery(
    materialSpendingFilters
  );

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
          <Grid item xs={5} mr={3}>
            <DateRangePicker
              size="small"
              spacing={2}
              values={dates}
              onChange={(dates) => {
                setDates(dates);
                dispatch(
                  setMaterialSpendingFilters({
                    ...materialSpendingFilters,
                    "filter[date_from]": dates[0] && formatDate(dates[0]),
                    "filter[date_to]": dates[1] && formatDate(dates[1]),
                  })
                );
              }}
            />
          </Grid>

          <Grid item xs={3} mr={3}>
            <Autocomplete
              name="property filter"
              size="small"
              label={t("byProperty")}
              noOptionsText={t("noProperties")}
              options={allProperties?.map((type) => ({
                value: type.id,
                label: type.title,
              }))}
              value={property}
              onChange={(e) => {
                setProperty(e.target.value);
                dispatch(
                  setMaterialSpendingFilters({
                    ...materialSpendingFilters,
                    "filter[property_id]": e.target.value,
                  })
                );
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <Autocomplete
              name="roles filter"
              size="small"
              label={t("byUserRole")}
              noOptionsText={t("noTypes")}
              options={allRoles?.map((type) => ({
                value: type.name,
                label: type.name,
              }))}
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value);
                dispatch(
                  setMaterialSpendingFilters({
                    ...materialSpendingFilters,
                    "filter[user_role]": e.target.value,
                  })
                );
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Table
            tableLabel="Material Spending List"
            headLabels={tableLabels}
            rowsData={tableData}
            metadata={{
              total: materialSpending.meta.total || 10, // note that these values is temporary because the mock do not return metadata
              pages: materialSpending.meta.lastPage || 10,
              perPage: materialSpending.meta.perPage || 3,
              currentPage: materialSpending.meta.currentPage || 1,
            }}
            onPageChange={(page, perPage) =>
              dispatch(
                setMaterialSpendingFilters({
                  ...materialSpendingFilters,
                  page,
                  perPage,
                })
              )
            }
          />
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <NoContent />
  );
}

export default MaterialSpending;
