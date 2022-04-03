import { useState } from "react";
import PropTypes from "prop-types";

import { Box, FormControlLabel, IconButton, Collapse } from "@mui/material";

import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import Checkbox from "./Checkbox";
import Icon from "../Icon";

function CheckboxMenu({ title, color, values, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box p="4px" border={1} borderColor="border" borderRadius="4px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <FormControlLabel
          label={title}
          control={
            <Checkbox
              color={color}
              checked={values.every((op) => !!op.value)}
              indeterminate={
                values.some((op) => !op.value) &&
                values.some((op) => !!op.value)
              }
              onChange={(checked) => {
                setIsExpanded(true);
                onChange(values.map((opt) => ({ ...opt, value: checked })));
              }}
            />
          }
          componentsProps={{ typography: { variant: "body2" } }}
          sx={{ m: 0 }}
        />

        <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
          <Icon
            size="medium"
            icon={isExpanded ? mdiChevronDown : mdiChevronUp}
          />
        </IconButton>
      </Box>

      <Collapse in={isExpanded} timeout="auto">
        <Box mt="4px">
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
      </Collapse>
    </Box>
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
