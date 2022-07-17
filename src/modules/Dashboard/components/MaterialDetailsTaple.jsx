import { useGetMaterialSpendingDetailsQuery } from "../../../redux/services/dashboard";

import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector, setMaterialSpendingDetailsFilters } from "../state";

import { useTranslation } from "react-i18next";

import { Typography, Paper } from "@mui/material";

import Table from "../../../shared/components/Table";
import NoContent from "../../../shared/views/NoContent";

function MaterialDetailsTaple({itemId}) {
  const { t } = useTranslation("dashboard");

  const { materialSpendingDetailsFilters } = useSelector(dashboardSelector);

  const { isLoading, data: materialSpending } = useGetMaterialSpendingDetailsQuery(itemId);

  const dispatch = useDispatch();
  
  const tableLabels = [
    t("orderNumber"),
    t("service"),
    t("material"),
    t("materialCost"),
    t("materialQuantity"),
    t("cost"),
  ];

  const tableData = materialSpending?.data.map((item) => ({
    id: itemId,
    clickable: false,
    active: true,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.order_number}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.service}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.material}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.cost}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.quantity}
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
          total: materialSpending.meta.total,
          pages: materialSpending.meta.lastPage ,
          perPage: materialSpending.meta.perPage ,
          currentPage: materialSpending.meta.currentPage ,
        }}
        onPageChange={(page, perPage) =>
          dispatch(
            setMaterialSpendingDetailsFilters({
              ...materialSpendingDetailsFilters,
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

export default MaterialDetailsTaple;
