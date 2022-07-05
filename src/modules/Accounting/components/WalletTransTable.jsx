import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/walletSlice";

import { useGetWalletTransactionsQuery } from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Typography, Link } from "@mui/material";
import { mdiMinus } from "@mdi/js";

import Table from "../../../shared/components/Table";
import Icon from "../../../shared/components/Icon";

import NoContent from "../../../shared/views/NoContent";

import { toTimeZone, formatDate, formats } from "../../../helpers/datetime";

function WalletTransTable() {
  const {
    t,
    i18n: { language },
  } = useTranslation("accounting");

  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  const { isLoading, data: transactions } =
    useGetWalletTransactionsQuery(filters);

  const tableLabels = [
    t("type"),
    t("date"),
    t("balanceBefore"),
    t("amount"),
    t("balanceAfter"),
    t("description"),
    t("remarks"),
  ];

  const tableData = transactions?.data?.map((item) => ({
    id: item.id,
    active: true,
    clickable: false,
    rowCells: [
      <Typography component="span" variant="body2" color="primary">
        {t(item.type)}
      </Typography>,

      <Typography component="span" variant="body2">
        {formatDate(toTimeZone(item.created_at), formats.dateShort, language)}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.balance_before.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.amount.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.balance_after.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {!!item.description ? t(`descrip_${item.description}`) : ""}
      </Typography>,

      item.remarks ? (
        item.remarks.url ? (
          <Link
            variant="body2"
            underline="hover"
            href={item.remarks.url}
            target="_blank"
            rel="noopener"
          >
            {item.remarks.title}
          </Link>
        ) : (
          <Typography component="span" variant="body2">
            {item.remarks.title}
          </Typography>
        )
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),
    ],
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="wallet transactions list"
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

export default WalletTransTable;
