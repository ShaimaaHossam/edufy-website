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
import MaterialDetailsTaple from "./MaterialDetailsTaple";

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
    t("numberOfOrders"),
    t("completedOrders"),
    t("cost"),
  ];

  const tableData = materialSpending?.data?.map((item) => ({
    id: item.id,
    clickable: false,
    active: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.property.title}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.total_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.completed_orders}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.total_cost}
      </Typography>,
    ],
    rowDetails: <MaterialDetailsTaple itemId={item.property.id} />,
  }));

  if (isLoading) return null;

  return (
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
                    "filters[date_from]": dates[0] && formatDate(dates[0]),
                    "filters[date_to]": dates[1] && formatDate(dates[1]),
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
                    "filters[property_id]": e.target.value,
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
                    "filters[user_role]": e.target.value,
                  })
                );
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {!!tableData?.length ? (
            <Table
              tableLabel="Material Spending List"
              headLabels={tableLabels}
              rowsData={tableData}
              expandable
              metadata={{
                total: materialSpending.meta.total,
                pages: materialSpending.meta.lastPage,
                perPage: materialSpending.meta.perPage,
                currentPage: materialSpending.meta.currentPage,
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
          ) : (
            <NoContent />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MaterialSpending;
