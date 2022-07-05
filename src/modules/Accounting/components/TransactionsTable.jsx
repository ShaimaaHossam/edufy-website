import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/invoicesSlice";

import { useGetTransactionsQuery } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Box, Typography, Chip, Tooltip } from "@mui/material";
import { mdiMinus } from "@mdi/js";

import Table from "../../../shared/components/Table";
import Icon from "../../../shared/components/Icon";

import NoContent from "../../../shared/views/NoContent";

import { TRANSACTION_TYPES } from "../../../constants/system";

import { toTimeZone, formatDate, formats } from "../../../helpers/datetime";

const typeColorMap = {
  [TRANSACTION_TYPES.order]: "warning",
  [TRANSACTION_TYPES.invoice]: "error",
  [TRANSACTION_TYPES.payment]: "success",
  [TRANSACTION_TYPES.credit_note]: "success",
  [TRANSACTION_TYPES.wallet_recharge]: "success",
};

function TransactionsTable() {
  const {
    t,
    i18n: { language },
  } = useTranslation("accounting");

  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  const { isLoading, data: transactions } = useGetTransactionsQuery(filters);

  const tableLabels = [
    t("date"),
    t("type"),
    t("description"),
    t("amount"),
    t("creditBalance"),
    t("invoicesDue"),
    t("payments"),
    t("creditLimit"),
  ];

  const tableData = transactions?.data?.map((item) => ({
    id: item.id,
    active: true,
    clickable: false,
    rowCells: [
      <Typography component="span" variant="body2">
        {formatDate(toTimeZone(item.created_at), formats.dateShort, language)}
      </Typography>,

      <Chip
        label={t(item.type)}
        size="small"
        variant="outlined"
        color={typeColorMap[item.type]}
        sx={{ width: 120 }}
      />,

      <Tooltip title={item.description}>
        <Box maxWidth={240}>
          <Typography display="block" component="span" variant="body2" noWrap>
            {item.description}
          </Typography>
        </Box>
      </Tooltip>,

      <Typography component="span" variant="body2">
        {t(item.amount.toFixed(2))} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {t(item.credit_balance.toFixed(2))} {t("sr")}
      </Typography>,

      !!item.invoices_due ? (
        <Typography component="span" variant="body2">
          {t(item.invoices_due.toFixed(2))} {t("sr")}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      !!item.payments ? (
        <Typography component="span" variant="body2">
          {t(item.payments.toFixed(2))} {t("sr")}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      <Typography component="span" variant="body2">
        {t(item.credit_limit.toFixed(2))} {t("sr")}
      </Typography>,
    ],
    rowDetails:
      item.type === TRANSACTION_TYPES.invoice ? (
        <Box mx={4} mb={4}>
          <Table
            tableLabel="invoice's orders"
            headLabels={[t("order"), t("amount")]}
            rowsData={item.invoice_orders.map((order) => ({
              id: order.order_number,
              active: true,
              clickable: false,
              rowCells: [
                <Typography component="span" variant="body2">
                  {t(order.order_number)}
                </Typography>,
                <Typography component="span" variant="body2">
                  {t(order.amount.toFixed(2))} {t("sr")}
                </Typography>,
              ],
            }))}
          />
        </Box>
      ) : null,
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="transactions list"
      expandable
      headLabels={tableLabels}
      rowsData={tableData}
      metadata={{
        total: transactions.meta.total,
        pages: transactions.meta.lastPage,
        perPage: transactions.meta.perPage,
        currentPage: transactions.meta.currentPage,
      }}
      onPageChange={(page, perPage) =>
        dispatch(setFilters({ ...filters, page, perPage }))
      }
    />
  ) : (
    <NoContent />
  );
}

export default TransactionsTable;
