import { useState } from "react";

import { useGetPropertyStateQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setPropertyStatsFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Typography, Paper, Grid } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import DateRangePicker from "../../../shared/components/inputs/DateRangePicker";
import PropertyStatsDetails from "./PropertyStatsDetails";

import { formatDate } from "../../../helpers/datetime";

function PropertyStats({ allRoles, allProperties }) {
  const { t } = useTranslation("dashboard");

  const [userRole, setUserRole] = useState("");
  const [property, setProperty] = useState("");
  const [dates, setDates] = useState([]);

  const { propertyStatsFilters } = useSelector(dashboardSelector);

  const { isLoading, data: propertyState } =
    useGetPropertyStateQuery(propertyStatsFilters);

  const dispatch = useDispatch();

  const tableLabels = [
    t("propertyName"),
    t("totalOrders"),
    t("completedOrders"),
    t("cost"),
  ];

  const tableData = propertyState?.data?.map((item) => ({
    id: item.property.title,
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
    rowDetails: <PropertyStatsDetails itemId={item.property.id} />,
  }));

  if (isLoading) return null;

  return (
    <Paper sx={{ p: 5, mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {t("propertyStats")}
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
                  setPropertyStatsFilters({
                    ...propertyStatsFilters,
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
                  setPropertyStatsFilters({
                    ...propertyStatsFilters,
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
                  setPropertyStatsFilters({
                    ...propertyStatsFilters,
                    "filter[user_role]": e.target.value,
                  })
                );
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {!!tableData?.length ? (
            <Table
              expandable
              tableLabel="Property Stats List"
              headLabels={tableLabels}
              rowsData={tableData}
              metadata={{
                total: propertyState.meta.total || 10, // note that these values is temporary because the mock do not return metadata
                pages: propertyState.meta.lastPage || 10,
                perPage: propertyState.meta.perPage || 3,
                currentPage: propertyState.meta.currentPage || 1,
              }}
              onPageChange={(page, perPage) =>
                dispatch(
                  setPropertyStatsFilters({
                    ...propertyStatsFilters,
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

export default PropertyStats;
