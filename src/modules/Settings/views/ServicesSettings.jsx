import { useState } from "react";

import {
  useGetCompanyServicesTreeQuery,
  useUpdateCompanyServicesMutation,
} from "../../../redux/services/general";

import usePermissions from "../../../shared/hooks/usePermissions";

import { useTranslation } from "react-i18next";

import { Grid, Button, Paper, Typography } from "@mui/material";

import ServicesSelection from "../../../shared/components/modules/services/ServicesSelection";

function ServicesSettings() {
  const { t } = useTranslation("settings");

  const settingPerms = usePermissions("setting");

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
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("servicesSettings")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 5 }}>
          <Grid
            item
            container
            columnSpacing={3}
            rowSpacing={3}
            margin="auto"
            xs={8}
          >
            <Grid item container xs={12}>
              <ServicesSelection
                services={services}
                isCompany
                changedServices={changedServices}
                onChange={(changedServices) =>
                  setChangedServices(changedServices)
                }
              />
            </Grid>
            
            {settingPerms.update && (
              <Grid item container justifyContent="flex-end">
                <Button color="success" onClick={handleSave}>
                  {t("saveChanges")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ServicesSettings;
