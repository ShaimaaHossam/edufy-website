import PropTypes from "prop-types";

import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";

import Link from "./Link";

function Breadcrumbs({ items }) {
  return (
    <MuiBreadcrumbs
      separator="›"
      aria-label="breadcrumb"
      sx={{ color: "primary" }}
    >
      {items.map(({ url, label }, idx) => (
        <Link key={idx} to={url} underline="always" variant="body2">
          {label}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumbs;
