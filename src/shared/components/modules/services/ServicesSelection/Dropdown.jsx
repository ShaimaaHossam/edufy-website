import { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import {
  Box,
  Divider,
  FormControlLabel,
  Collapse,
  Typography,
} from "@mui/material";

import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import Checkbox from "../../../inputs/Checkbox";
import IconButton from "../../../IconButton";

function Dropdown({
  tree,
  isCompany,
  onChange,
  changedServices,
  hasEndItems,
  children,
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  const items = tree.children;
  const handleItemChange = (item, checked) => {
    const newItem = { ...item, checked };
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
              checked={
                hasEndItems
                  ? isCompany
                    ? items.every((i) => changedServices[i.id]?.checked)
                    : items.every((i) => changedServices[i.id]?.active !== true)
                    ? false
                    : items
                        .filter((i) => i.active)
                        .every((i) => changedServices[i.id]?.checked)
                  : false
              }
              indeterminate={
                hasEndItems
                  ? items.some((i) =>
                      isCompany
                        ? changedServices[i.id]?.checked
                        : changedServices[i.id]?.active &&
                          changedServices[i.id]?.checked
                    ) &&
                    items.some((i) =>
                      isCompany
                        ? changedServices[i.id]?.checked
                        : changedServices[i.id]?.active &&
                          !changedServices[i.id]?.checked
                    )
                  : !!children
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
        {!isCompany && !children && items.every((i) => i.active === false) ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mx: 2, mt: 2, mb: 1 }}
          >
            {t("noServicesAvailable")}
          </Typography>
        ) : (
          <>
            {items
              .filter((i) => isCompany || i.active === true)
              .map((item, idx) => (
                <Fragment key={item.id}>
                  <FormControlLabel
                    label={language === "en" ? item.name.en : item.name.ar}
                    control={
                      <Checkbox checked={!!changedServices[item.id]?.checked} />
                    }
                    onChange={(checked) =>
                      hasEndItems && handleItemChange(item, checked)
                    }
                    componentsProps={{ typography: { variant: "body2" } }}
                    sx={{ width: "100%", m: 0, ml: 6, py: 0.5 }}
                  />

                  {(!!children ||
                    idx <
                      items.filter((i) => isCompany || i.active === true)
                        .length -
                        1) && <Divider variant="fullWidth" />}
                </Fragment>
              ))}

            {children && <Box ml={5}>{children}</Box>}
          </>
        )}
      </Collapse>
    </>
  );
}

Dropdown.propTypes = {
  tree: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
    children: PropTypes.array,
    checked: PropTypes.bool,
  }).isRequired,
  isCompany: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  changedServices: PropTypes.object.isRequired,
  hasEndItems: PropTypes.bool.isRequired,
};

export default Dropdown;
