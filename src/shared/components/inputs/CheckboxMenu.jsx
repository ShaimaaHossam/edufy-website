import { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Collapse,
} from "@mui/material";

import {
  mdiChevronDown,
  mdiChevronUp,
  mdiCheckboxBlank,
  mdiCheckboxIntermediate,
} from "@mdi/js";

import Icon from "../Icon";

function CheckboxMenu({ title, color, values, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box p={1} border={1} borderColor="border" borderRadius="4px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <FormControlLabel
          label={title}
          control={
            <Checkbox
              size="small"
              color={color || "primary"}
              checked={values.every((op) => !!op.value)}
              indeterminate={
                values.some((op) => !op.value) &&
                values.some((op) => !!op.value)
              }
              onChange={(e, checked) => {
                setIsExpanded(true);
                onChange(values.map((opt) => ({ ...opt, value: checked })));
              }}
              icon={
                <Icon
                  icon={mdiCheckboxBlank}
                  sx={{ color: "action.disabled" }}
                />
              }
              indeterminateIcon={<Icon icon={mdiCheckboxIntermediate} />}
              sx={{ width: 34, height: 34 }}
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
        <Box mt={1}>
          {values.map((option) => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              control={
                <Checkbox
                  size="small"
                  color={color || "primary"}
                  checked={option.value}
                  onChange={(e, checked) =>
                    onChange(
                      values.map((opt) =>
                        opt.id === option.id ? { ...opt, value: checked } : opt
                      )
                    )
                  }
                  icon={
                    <Icon
                      icon={mdiCheckboxBlank}
                      sx={{ color: "action.disabled" }}
                    />
                  }
                  sx={{ width: 34, height: 34 }}
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
  color: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxMenu;
