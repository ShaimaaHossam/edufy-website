import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { ordersSelector, setFilters } from "../../../../redux/slices/orders";

import { useGetOrdersQuery } from "../../../../redux/services/orders";
import { orders } from "../../../../redux/services/ordersData";

import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";

import NoContent from "../../../views/NoContent";

import Table from "../../Table";
import Link from "../../Link";

import ServicesTableList from "../services/ServicesTableList";
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
  const { filters } = useSelector(ordersSelector);

  // const { isLoading, data: orders } = useGetOrdersQuery({
  //   "filter[service_type]": orderType,
  //   ...filters,
  // });

  const tableLabels = [
    t("orderNo"),
    t("startDate"),
    t("createdBy"),
    t("property"),
    t("units"),
    t("services"),
    t("cost"),
    t("type"),
    t("status"),
  ];
  const tableData = orders?.data?.map((item) => ({
    id: item.id,
    active: true,
    clickable: true,
    onClick: () => navigate(`/orders/${item.service_type}/${item.id}`),
    rowCells: [
      <Link
        to={`/orders/${item.service_type}/${item.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          component="span"
          variant="body2"
          color="primary"
          sx={{ textDecoration: "underline" }}
        >
          {`#${item.order_number}`}
        </Typography>
      </Link>,

      <Typography component="span" variant="body2">
        {formatDate(item.due_date, formats.dateShort, language)}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.created_by.name}
      </Typography>,

      <Link
        underline="hover"
        to={`/properties/${item.property.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography component="span" variant="body2">
          {item.property.title}
        </Typography>
      </Link>,

      <OrderUnits units={item.units} propertyID={item.property.id} />,

      <ServicesTableList services={item.services} />,

      <Typography component="span" variant="body2">
        {item.total_amount}{" "}
        <Typography component="span" variant="inherit" color="textSecondary">
          {t("sr")}
        </Typography>
      </Typography>,

      null,

      <OrderStatus status={item.status} />,
    ],
  }));

  // if (isLoading) return null;

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
        dispatch(setFilters({ ...filters, page, perPage }))
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
