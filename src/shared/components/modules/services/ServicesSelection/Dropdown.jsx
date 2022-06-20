import { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { Box, Divider, FormControlLabel, Collapse } from "@mui/material";

import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import Checkbox from "../../../inputs/Checkbox";
import IconButton from "../../../IconButton";

function Dropdown({ tree, onChange, changedServices, hasEndItems, children }) {
  const {
    i18n: { language },
  } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  const [items, setItems] = useState(tree.children);
  const handleItemChange = (item) => {
    const newItem = { ...item, checked: !item.checked };
    const newItems = items.map((i) => (i.id === item.id ? newItem : i));

    setItems(newItems);
    onChange({ ...changedServices, [newItem.id]: newItem });
  };

  return (
    <>
      <Box
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormControlLabel
          label={language === "en" ? tree.name.en : tree.name.ar}
          control={
            <Checkbox
              checked={hasEndItems ? items.every((i) => !!i.checked) : false}
              indeterminate={
                hasEndItems
                  ? items.some((i) => !i.checked) &&
                    items.some((i) => !!i.checked)
                  : true
              }
              onChange={() => setIsExpanded(!isExpanded)}
            />
          }
          componentsProps={{ typography: { variant: "body2" } }}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton
          size="medium"
          icon={isExpanded ? mdiChevronDown : mdiChevronUp}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </Box>

      {isExpanded && <Divider variant="fullWidth" />}

      <Collapse in={isExpanded} timeout="auto">
        {items.map(
          (item, idx) =>
            (item.active === undefined || item.active === true) && (
              <Fragment key={item.id}>
                <FormControlLabel
                  label={language === "en" ? item.name.en : item.name.ar}
                  control={
                    <Checkbox
                      checked={
                        !!changedServices[item.id]
                          ? changedServices[item.id].checked
                          : item.checked
                      }
                    />
                  }
                  onChange={() => hasEndItems && handleItemChange(item)}
                  componentsProps={{ typography: { variant: "body2" } }}
                  sx={{ width: "100%", m: 0, ml: 6, py: 0.5 }}
                />

                {(idx < items.length - 1 || !!children) && (
                  <Divider variant="fullWidth" />
                )}
              </Fragment>
            )
        )}

        <Box ml={5}>{children}</Box>
      </Collapse>
    </>
  );
}

Dropdown.propTypes = {
  hasEndItems: PropTypes.bool.isRequired,
  tree: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
    children: PropTypes.array,
    checked: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  changedServices: PropTypes.object.isRequired,
};

export default Dropdown;
