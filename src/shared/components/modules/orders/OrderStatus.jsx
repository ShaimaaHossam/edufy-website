import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { Chip } from "@mui/material";

import { ORDER_STATUSES } from "../../../../constants/system";

const statusColorMap = {
  [ORDER_STATUSES.requested]: "info",
  [ORDER_STATUSES.pending]: "default",
  [ORDER_STATUSES.assigned]: "info",
  [ORDER_STATUSES.in_progress]: "warning",
  [ORDER_STATUSES.completed]: "success",
  [ORDER_STATUSES.canceled]: "error",
};

function OrderStatus({ status }) {
  const { t } = useTranslation("orders");

  return (
    <Chip
      label={t(status)}
      size="small"
      variant="outlined"
      color={statusColorMap[status]}
      sx={{ width: 90 }}
    />
  );
}

OrderStatus.propTypes = {
  status: PropTypes.oneOf(Object.values(ORDER_STATUSES)).isRequired,
};

export default OrderStatus;
