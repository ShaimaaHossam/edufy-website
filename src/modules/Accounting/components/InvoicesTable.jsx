import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/invoicesSlice";

import {
  useGetInvoicesQuery,
  useLazyDownloadInvoicePDFQuery,
} from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Typography, Chip, Tooltip } from "@mui/material";
import { mdiCloudDownloadOutline, mdiMinus } from "@mdi/js";

import Table from "../../../shared/components/Table";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";

import NoContent from "../../../shared/views/NoContent";

import InvoiceDetails from "./InvoiceDetails";
import InvoicePaymentDialog from "./InvoicePaymentDialog";
import InvoiceReportDialog from "./InvoiceReportDialog";

import { INVOICE_STATUSES, INVOICE_TYPES } from "../../../constants/system";

import { toTimeZone, formatDate, formats } from "../../../helpers/datetime";
import { downloadFile } from "../../../helpers/routing";

const statusColorMap = {
  [INVOICE_STATUSES.unpaid]: "default",
  [INVOICE_STATUSES.pending]: "warning",
  [INVOICE_STATUSES.paid]: "success",
  [INVOICE_STATUSES.rejected]: "error",
};

function InvoicesTable() {
  const {
    t,
    i18n: { language },
  } = useTranslation("accounting");

  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  const { isLoading, data: invoices } = useGetInvoicesQuery(filters);
  const [downloadInvoicePDF] = useLazyDownloadInvoicePDFQuery();

  const tableLabels = [
    t("invoiceNo"),
    t("type"),
    t("date"),
    t("status"),
    t("amount"),
    t("paidAmount"),
    t("refundAmount"),
    t("remainingAmount"),
    t("paymentType"),
    "",
  ];

  const tableData = invoices?.data?.map((item) => ({
    id: item.id,
    active: true,
    clickable: false,
    rowCells: [
      <Typography component="span" variant="body2" color="primary">
        {"#" + t(item.invoice_number)}
      </Typography>,

      <Typography component="span" variant="body2" color="primary">
        {t(item.type)}
      </Typography>,

      <Typography component="span" variant="body2">
        {formatDate(toTimeZone(item.created_at), formats.dateShort, language)}
      </Typography>,

      <Chip
        label={
          item.type === INVOICE_TYPES.credit_note
            ? t("approved")
            : t(item.status)
        }
        size="small"
        variant="outlined"
        color={statusColorMap[item.status]}
        sx={{ width: 100 }}
      />,

      <Typography component="span" variant="body2">
        {item.total_amount.toFixed(2)} {t("sr")}
      </Typography>,

      item.type === INVOICE_TYPES.invoice ? (
        <Typography component="span" variant="body2">
          {item.status === INVOICE_STATUSES.paid
            ? item.required_amount.toFixed(2)
            : "0.00"}{" "}
          {t("sr")}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      item.type === INVOICE_TYPES.invoice ? (
        <Typography component="span" variant="body2">
          {item.refund_amount.toFixed(2)} {t("sr")}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      item.type === INVOICE_TYPES.invoice ? (
        <Typography component="span" variant="body2">
          {item.status !== INVOICE_STATUSES.paid
            ? item.required_amount.toFixed(2)
            : "0.00"}{" "}
          {t("sr")}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      item.status === INVOICE_STATUSES.paid ? (
        <Typography component="span" variant="body2" color="primary">
          {t(item.payment_type)}
        </Typography>
      ) : (
        <Icon icon={mdiMinus} size="medium" color="action" />
      ),

      <Tooltip title={t("downloadInvoicePDF")}>
        <IconButton
          aria-label="download invoice pdf"
          size="small"
          icon={mdiCloudDownloadOutline}
          onClick={() =>
            downloadInvoicePDF(item.id)
              .unwrap()
              .then((data) =>
                downloadFile(data, `invoice_${item.invoice_number}`)
              )
          }
        />
      </Tooltip>,
    ],
    rowDetails:
      item.type === INVOICE_TYPES.invoice ? (
        <InvoiceDetails invoice={item} />
      ) : null,
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <>
      <Table
        tableLabel="invoices list"
        expandable
        headLabels={tableLabels}
        rowsData={tableData}
        metadata={{
          total: invoices.meta.total,
          pages: invoices.meta.lastPage,
          perPage: invoices.meta.perPage,
          currentPage: invoices.meta.currentPage,
        }}
        onPageChange={(page, perPage) =>
          dispatch(setFilters({ ...filters, page, perPage }))
        }
      />

      <InvoiceReportDialog />
      <InvoicePaymentDialog />
    </>
  ) : (
    <NoContent />
  );
}

export default InvoicesTable;
