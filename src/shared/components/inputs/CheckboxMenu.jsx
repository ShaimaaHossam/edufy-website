import { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from "@mui/material";
import ExpandIcon from "@mui/icons-material/ExpandMore";

import Checkbox from "./Checkbox";

function CheckboxMenu({ title, color, values, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={(e, expanded) => setIsExpanded(expanded)}
      sx={{ border: 1, borderRadius: "4px", borderColor: "divider" }}
    >
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <FormControlLabel
          label={title}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => e.stopPropagation()}
          control={
            <Checkbox
              color={color}
              checked={values.every((op) => !!op.value)}
              indeterminate={
                values.some((op) => !op.value) &&
                values.some((op) => !!op.value)
              }
              onChange={(checked) => {
                !isExpanded && setIsExpanded(true);
                onChange(values.map((opt) => ({ ...opt, value: checked })));
              }}
            />
          }
          componentsProps={{ typography: { variant: "body2" } }}
          sx={{ m: 0 }}
        />
      </AccordionSummary>

      {isExpanded && <Divider variant="fullWidth" sx={{ mx: 2, mt: -1 }} />}

      <AccordionDetails>
        <Box ml={3}>
          {values.map((option) => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              control={
                <Checkbox
                  color={color}
                  checked={option.value}
                  onChange={(checked) =>
                    onChange(
                      values.map((opt) =>
                        opt.id === option.id ? { ...opt, value: checked } : opt
                      )
                    )
                  }
                />
              }
              componentsProps={{ typography: { variant: "body2" } }}
              sx={{ width: "100%", m: 0 }}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

CheckboxMenu.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf([
    "info",
    "error",
    "warning",
    "success",
    "primary",
    "secondary",
  ]),
};

export default CheckboxMenu;
