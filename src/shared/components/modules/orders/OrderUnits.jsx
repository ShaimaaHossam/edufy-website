import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

import { Typography, MenuItem, Button } from "@mui/material";

import Menu from "../../Menu";
import Link from "../../Link";

function OrderUnits({ units, propertyID }) {
  const navigate = useNavigate();

  if (units.length === 1) {
    return (
      <Typography component="span" variant="body2">
        <Link
          color="inherit"
          underline="hover"
          to={`/properties/${propertyID}`}
        >
          {units[0].title}
        </Link>
      </Typography>
    );
  }

  return (
    <Menu
      label="units list"
      AnchorComponent={Button}
      AnchorComponentProps={{
        size: "small",
        color: "inherit",
        variant: "text",
        endIcon: `+${units.length - 1}`,
        children: units[0].title,
        onClick: (e) => e.stopPropagation(),
        sx: { fontWeight: 400, fontSize: 14, p: 0 },
      }}
      AnchorComponentOpenProps={{
        color: "primary",
      }}
    >
      {units.map((unit) => (
        <MenuItem
          key={unit.id}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/properties/${propertyID}`);
          }}
        >
          {unit.title}
        </MenuItem>
      ))}
    </Menu>
  );
}

OrderUnits.propTypes = {
  units: PropTypes.arrayOf(PropTypes.object).isRequired,
  propertyID: PropTypes.string.isRequired,
};

export default OrderUnits;
