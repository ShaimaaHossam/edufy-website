import { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Box,
  Collapse,
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableFooter,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  tableCellClasses,
  TablePagination,
} from "@mui/material";

import { mdiChevronRight, mdiChevronLeft, mdiChevronUp } from "@mdi/js";

import PaginationActions from "./PaginationActions";

import IconButton from "../IconButton";

const TableRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) =>
    ["selected", "active", "clickable"].indexOf(prop) === -1,
})(({ theme, selected, active, clickable }) => ({
  ...(clickable && { cursor: "pointer" }),
  ...(!active && { opacity: 0.7 }),
  ...(selected && {
    outline: `1px dashed ${theme.palette.primary.main}`,
    outlineOffset: -1,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  }),
}));

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== "expandable",
})(({ theme, expandable }) => ({
  verticalAlign: "middle",

  [`&.${tableCellClasses.head}`]: {
    paddingTop: 6,
    paddingBottom: 6,
    border: "unset",
    backgroundColor: theme.palette.greyScale[300],
    "&:first-of-type": {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    "&:last-of-type": {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    paddingTop: 8,
    paddingBottom: 8,
    ...(expandable && { borderBottom: "unset" }),
  },
}));

const chevronIconMapping = {
  ltr: mdiChevronRight,
  rtl: mdiChevronLeft,
};

function Table({
  tableLabel,
  headLabels,
  expandable,
  selectedRowID,
  rowsData,
  metadata,
  onPageChange,
}) {
  const { direction } = useTheme();

  const [expandedRowID, setExpandedRowID] = useState("");

  return (
    <TableContainer>
      <MuiTable aria-label={tableLabel}>
        <TableHead>
          <TableRow sx={{ opacity: 1 }}>
            {expandable && <TableCell padding="checkbox" />}

            {headLabels.map((label, idx) => (
              <TableCell key={idx}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rowsData.map((row) => (
            <Fragment key={row.id}>
              <TableRow
                active={row.active}
                selected={row.id === selectedRowID}
                clickable={row.clickable}
                onClick={row.onClick}
              >
                {expandable && (
                  <TableCell padding="checkbox" expandable={expandable}>
                    {!!row.rowDetails && (
                      <IconButton
                        aria-label={
                          row.id === expandedRowID
                            ? "collapse row"
                            : "expand row"
                        }
                        size="small"
                        icon={
                          row.id === expandedRowID
                            ? mdiChevronUp
                            : chevronIconMapping[direction]
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRowID(
                            row.id === expandedRowID ? "" : row.id
                          );
                        }}
                      />
                    )}
                  </TableCell>
                )}

                {row.rowCells.map((cell, idx) => (
                  <TableCell key={idx} expandable={expandable}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>

              {expandable && !!row.rowDetails && (
                <TableRow active>
                  <TableCell
                    colSpan={Object.keys(headLabels).length + 1}
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                  >
                    <Collapse timeout="auto" in={row.id === expandedRowID}>
                      <Box m={1} mb={2}>
                        {row.rowDetails}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>

        {metadata?.pages > 1 && (
          <TableFooter>
            <TableRow sx={{ opacity: 1 }}>
              <TablePagination
                page={metadata.currentPage - 1}
                count={metadata.total}
                rowsPerPage={metadata.perPage}
                rowsPerPageOptions={[20, 50, 100]}
                onPageChange={(e, nextPage) =>
                  onPageChange(nextPage + 1, metadata.perPage)
                }
                onRowsPerPageChange={(e) => {
                  onPageChange(1, parseInt(e.target.value, 10));
                }}
                ActionsComponent={PaginationActions}
                SelectProps={{
                  sx: {
                    border: "1px solid",
                    borderColor: "border",
                    borderRadius: "4px",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}

Table.propTypes = {
  tableLabel: PropTypes.string.isRequired,
  headLabels: PropTypes.arrayOf(PropTypes.node).isRequired,
  expandable: PropTypes.bool,
  selectedRowID: PropTypes.arrayOf(PropTypes.string),
  rowsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      rowCells: PropTypes.arrayOf(PropTypes.node).isRequired,
      rowDetails: PropTypes.node,
      clickable: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ).isRequired,
  metadata: PropTypes.shape({
    total: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
  }),
  onPageChange: PropTypes.func,
};

export default Table;
