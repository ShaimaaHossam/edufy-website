import { Box, useTheme } from "@mui/material";

import {
  mdiChevronRight,
  mdiChevronLeft,
  mdiPageLast,
  mdiPageFirst,
} from "@mdi/js";

import IconButton from "../IconButton";

function PaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const { direction } = useTheme();

  const handleFirstPageClick = (event) => {
    onPageChange(event, 0);
  };
  const handleLastPageClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleNextClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleBackClick = (event) => {
    onPageChange(event, page - 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        color="primary"
        shape="rounded"
        variant="outlined"
        disabled={page === 0}
        icon={direction === "rtl" ? mdiPageLast : mdiPageFirst}
        onClick={handleFirstPageClick}
        sx={{ mr: 1 }}
        aria-label="first page"
      />

      <IconButton
        color="primary"
        shape="rounded"
        variant="outlined"
        disabled={page === 0}
        icon={direction === "rtl" ? mdiChevronRight : mdiChevronLeft}
        onClick={handleBackClick}
        sx={{ mr: 1 }}
        aria-label="previous page"
      />

      <IconButton
        color="primary"
        shape="rounded"
        variant="outlined"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        icon={direction === "rtl" ? mdiChevronLeft : mdiChevronRight}
        onClick={handleNextClick}
        sx={{ mr: 1 }}
        aria-label="next page"
      />

      <IconButton
        color="primary"
        shape="rounded"
        variant="outlined"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        icon={direction === "rtl" ? mdiPageFirst : mdiPageLast}
        onClick={handleLastPageClick}
        aria-label="last page"
      />
    </Box>
  );
}

export default PaginationActions;
