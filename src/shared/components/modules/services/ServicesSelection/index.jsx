import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { Box, Grid, Button } from "@mui/material";

import Dropdown from "./Dropdown";

function ServicesSelection({ services, isCompany, onChange, changedServices }) {
  const {
    i18n: { language },
  } = useTranslation();

  const [selectedService, setSelectedService] = useState(services[0]);

  // on mount, report all leaf services, BADLY :(
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    const onChange = onChangeRef.current;

    let allReducedItems = {};
    const reduceNesting = (tree) => {
      const { children, items } = tree;

      const reducedItems = !!items.length
        ? items.reduce((acc, i) => ({ ...acc, [i.id]: i }), {})
        : {};
      allReducedItems = { ...allReducedItems, ...reducedItems };

      !!children.length && children.forEach((c) => reduceNesting(c));
    };
    services.forEach((c) => reduceNesting(c));

    onChange(allReducedItems);
  }, [services]);

  const renderDropdown = (child) => {
    const { children, items, ...childData } = child;
    const subChild = {
      ...childData,
      children: !!children?.length ? children : [],
    };
    const endChild = {
      ...childData,
      children: !!items?.length ? items : [],
    };

    return (
      <Dropdown
        key={child.id}
        isCompany={isCompany}
        tree={endChild}
        onChange={onChange}
        changedServices={changedServices}
        hasEndItems={!!endChild.children.length}
      >
        {!!subChild?.children.length
          ? subChild.children.map((i) => renderDropdown(i))
          : null}
      </Dropdown>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item container spacing={2} justifyContent="space-between">
        {services.map((service) => (
          <Grid key={service.id} item>
            <Button
              variant={
                service.id === selectedService?.id ? "contained" : "outlined"
              }
              onClick={() => setSelectedService(service)}
              sx={{ minWidth: 180 }}
            >
              {language === "en" ? service.name.en : service.name.ar}
            </Button>
          </Grid>
        ))}
      </Grid>

      {selectedService && (
        <Grid item container spacing={2}>
          {selectedService.children.map((child) => (
            <Grid key={child.id} item xs={12}>
              <Box
                pt={0.5}
                pb={1}
                border={1}
                borderColor="divider"
                borderRadius="4px"
              >
                {renderDropdown(child)}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

ServicesSelection.propTypes = {
  services: PropTypes.array.isRequired,
  isCompany: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  changedServices: PropTypes.object.isRequired,
};

export default ServicesSelection;
