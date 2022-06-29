import { useState } from "react";

import {
  useGetCompanyServicesTreeQuery,
  useUpdateCompanyServicesMutation,
} from "../../../redux/services/general";

import { useTranslation } from "react-i18next";

import { Grid, Button } from "@mui/material";

import ServicesSelection from "../../../shared/components/modules/services/ServicesSelection";

function ServicesSettings() {
  const { t } = useTranslation("settings");

  const { data: services } = useGetCompanyServicesTreeQuery();
  const [updateServices] = useUpdateCompanyServicesMutation();

  const [changedServices, setChangedServices] = useState({});

  const handleSave = () => {
    const data = Object.values(changedServices).map(
      ({ id, checked, name, description }) => ({
        service_id: id,
        service_name: name,
        service_description: description,
        checked: checked,
      })
    );
    updateServices(data);
  };

  if (!services) return null;

  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs={12}>
        <ServicesSelection
          services={services}
          isCompany
          changedServices={changedServices}
          onChange={(changedServices) => setChangedServices(changedServices)}
        />
      </Grid>

      <Grid item alignSelf="flex-end">
        <Button color="success" onClick={handleSave}>
          {t("saveChanges")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default ServicesSettings;
