import { useState } from "react";

import usePermissions from "../../../../shared/hooks/usePermissions";

import { useParams } from "react-router-dom";

import { useGetPropertyQuery } from "../../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Tabs, Tab } from "@mui/material";

import NotFound from "../../../../shared/views/NotFound";

import Breadcrumbs from "../../../../shared/components/Breadcrumbs";
import Loader from "../../../../shared/components/Loader";
import TabPanel from "../../../../shared/components/TabPanel";

import Units from "./Units";
import Assets from "./Assets";
import Orders from "./Orders";
import PropertyInformation from "../../components/PropertyInformation";

function PropertyDetails() {
  const { t } = useTranslation("properties");

  const unitsPerms = usePermissions("unit");

  const { propertyID } = useParams();
  const { isFetching, error } = useGetPropertyQuery(propertyID);

  const [tabIdx, setTabIdx] = useState("units");

  if (isFetching) return <Loader />;
  if (error?.status === 404) return <NotFound />;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("properties"), url: "/properties" }]} />

        <Typography component="h1" variant="h5">
          {t("propertyDetails")}
        </Typography>
      </Grid>

      <Grid item container spacing={2} alignItems="flex-start">
        <Grid item xs={3} sx={{ position: "sticky", top: 70 }}>
          <Paper sx={{ p: 3 }}>
            <PropertyInformation key={propertyID} />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Paper sx={{ p: 3 }}>
            <Tabs
              aria-label="property details"
              value={tabIdx}
              onChange={(e, newTabIdx) => setTabIdx(newTabIdx)}
            >
              {unitsPerms.access && (
                <Tab
                  label={t("units")}
                  value="units"
                  id="tab-units"
                  aria-controls="tabpanel-units"
                />
              )}

              <Tab
                label={t("assets")}
                value="assets"
                id="tab-assets"
                aria-controls="tabpanel-assets"
              />
              <Tab
                label={t("orders")}
                value="orders"
                id="tab-orders"
                aria-controls="tabpanel-orders"
              />
            </Tabs>

            {unitsPerms.access && (
              <TabPanel index="units" value={tabIdx}>
                <Units />
              </TabPanel>
            )}

            <TabPanel index="assets" value={tabIdx}>
              <Assets />
            </TabPanel>

            <TabPanel index="orders" value={tabIdx}>
              <Orders />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PropertyDetails;
