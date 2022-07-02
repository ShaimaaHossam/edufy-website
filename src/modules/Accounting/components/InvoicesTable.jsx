import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/walletSlice";

import {
  useGetInvoicesQuery,
  useLazyDownloadInvoicePDFQuery,
} from "../../../redux/services/accounting";

import { useTranslation } from "react-i18next";

import { Typography, Chip, Tooltip } from "@mui/material";
import { mdiCloudDownloadOutline } from "@mdi/js";

import Table from "../../../shared/components/Table";
import IconButton from "../../../shared/components/IconButton";

import NoContent from "../../../shared/views/NoContent";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceRejectDialog from "./InvoiceRejectDialog";

import { INVOICE_STATUSES } from "../../../constants/system";

import { toTimeZone, formatDate, formats } from "../../../helpers/datetime";
import { downloadFile } from "../../../helpers/routing";

const statusColorMap = {
  [INVOICE_STATUSES.pending]: "default",
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
    t("invoiceAmount"),
    t("vatAmount"),
    t("totalAmount"),
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
        label={t(item.status)}
        size="small"
        variant="outlined"
        color={statusColorMap[item.status]}
        sx={{ width: 80 }}
      />,

      <Typography component="span" variant="body2">
        {item.invoice_amount.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.vat_amount.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.total_amount.toFixed(2)} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2" color="primary">
        {t(item.payment_type)}
      </Typography>,

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
    rowDetails: <InvoiceDetails invoice={item} />,
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

      <InvoiceRejectDialog />
    </>
  ) : (
    <NoContent />
  );
}

export default InvoicesTable;
