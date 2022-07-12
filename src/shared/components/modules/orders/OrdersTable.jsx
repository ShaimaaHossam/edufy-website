import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  ordersFiltersSelector,
  setFilters,
} from "../../../../redux/slices/ordersFilters";

import { useGetOrdersQuery } from "../../../../redux/services/orders";
// import { orders } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Typography, Box, Grid } from "@mui/material";

import NoContent from "../../../views/NoContent";

import Table from "../../Table";
import Link from "../../Link";

// import ServicesTableList from "../services/ServicesTableList";
import OrderStatus from "./OrderStatus";
import OrderUnits from "./OrderUnits";

import { formatDate, formats } from "../../../../helpers/datetime";
import { ORDER_TYPES } from "../../../../constants/system";

function OrdersTable({ orderType }) {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { maintenanceFilters, cleaningFilters } = useSelector(
    ordersFiltersSelector
  );

  const { isLoading, data: orders } = useGetOrdersQuery(
    orderType === ORDER_TYPES.maintenance
      ? {
          // "filter[service_type]": orderType,
          ...maintenanceFilters,
        }
      : {
          // "filter[service_type]": orderType,
          ...cleaningFilters,
        }
  );
  console.log(orders);
  const tableLabels = [
    t("orderNo"),
    t("startDate"),
    t("createdBy"),
    t("property"),
    t("units"),
    t("cost"),
    t("services"),
    t(orderType === ORDER_TYPES.maintenance ? "serviceDescription" : "type"),
    t("status"),
  ];
  const tableData = orders?.data?.map((item) => ({
    id: item.id,
    active: true,
    clickable: true,
    onClick: () => navigate(`/orders/${item.type}/${item.id}`),
    rowCells: [
      <Link
        to={`/orders/${item.type}/${item.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          component="span"
          variant="body2"
          color="primary"
          sx={{ textDecoration: "underline" }}
        >
          {/* order number */}
          {`#${item.reference}`}
        </Typography>
      </Link>,

      <Typography component="span" variant="body2">
        {formatDate(
          item.schedule.date,
          formats.dateShortSpaceSeparated,
          language,
          false
        )}
      </Typography>,
      <Grid container>
        <Grid item xs={12}>
          <Typography component="span" variant="body2">
            {item.user.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="span" variant="body2" color="textSecondary">
            {item.user.role}
          </Typography>
        </Grid>
      </Grid>,

      <Link
        underline="hover"
        to={`/properties/${item.property.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography component="span" variant="body2">
          {item.property.title}
        </Typography>
      </Link>,
      <Typography component="span" variant="body2">
        {item.unit.title}
      </Typography>,
      // <OrderUnits units={item.units} propertyID={item.property.id} />,

      // <ServicesTableList services={item.services} />,

      <Typography component="span" variant="body2">
        {item.total}{" "}
        <Typography component="span" variant="inherit" color="textSecondary">
          {t("sr")}
        </Typography>
      </Typography>,
      <Typography component="span" variant="body2">
        {language === "en" ? item.category.name.en : item.category.name.ar}
      </Typography>,

      <Typography component="span" variant="body2">
        {orderType === ORDER_TYPES.maintenance
          ? language === "en"
            ? item.category.description.en
            : item.category.description.ar
          : "type"}
      </Typography>,

      <OrderStatus status={item.status} />,
    ],
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="orders list"
      headLabels={tableLabels}
      rowsData={tableData}
      metadata={{
        total: orders.meta.total,
        pages: orders.meta.lastPage,
        perPage: orders.meta.perPage,
        currentPage: orders.meta.currentPage,
      }}
      onPageChange={(page, perPage) =>
        dispatch(
          setFilters({
            key:
              orderType === ORDER_TYPES.maintenance
                ? "maintenanceFilters"
                : "cleaningFilters",
            value:
              orderType === ORDER_TYPES.maintenance
                ? { ...maintenanceFilters, page, perPage }
                : { ...cleaningFilters, page, perPage },
          })
        )
      }
    />
  ) : (
    <NoContent />
  );
}

OrdersTable.propTypes = {
  orderType: PropTypes.oneOf(Object.values(ORDER_TYPES)),
};

export default OrdersTable;
