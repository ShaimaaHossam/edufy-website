import { useGetPropertyStateDetailsQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setPropertyStatsDetailsFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Typography, Paper } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";

function PropertyStatsDetails({ itemId }) {
  const { t } = useTranslation("dashboard");

  const { propertyStatsDetailsFilters } = useSelector(dashboardSelector);

  const { isLoading, data: materialSpending } = useGetPropertyStateDetailsQuery(itemId);

  const dispatch = useDispatch();
 
  const tableLabels = [
    t("unitName"),
    t("totalOrders"),
    t("completedOrders"),
    t("cost"),
  ];

  const tableData = materialSpending?.data.map((item) => ({
    id: item.unit.id,
    clickable: false,
    active: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.unit.title}
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
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Paper>
      <Table
        tableLabel="Material Spending Details List"
        headLabels={tableLabels}
        rowsData={tableData}
        metadata={{
          total: materialSpending.meta.total ,
          pages: materialSpending.meta.lastPage ,
          perPage: materialSpending.meta.perPage ,
          currentPage: materialSpending.meta.currentPage || 1,
        }}
        onPageChange={(page, perPage) =>
          dispatch(
            setPropertyStatsDetailsFilters({
              ...propertyStatsDetailsFilters,
              page,
              perPage,
            })
          )
        }
      />
    </Paper>
  ) : (
    <NoContent />
  );
}

export default PropertyStatsDetails;
