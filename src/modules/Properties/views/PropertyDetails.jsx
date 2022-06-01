import { useParams } from "react-router-dom";

import { useGetPropertyQuery } from "../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography } from "@mui/material";

import NotFound from "../../../shared/views/NotFound";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Loader from "../../../shared/components/Loader";

import PropertyInformation from "../components/PropertyInformation";

function PropertyDetails() {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();
  const { isFetching, error } = useGetPropertyQuery(propertyID);

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
            <PropertyInformation />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Paper sx={{ p: 3 }}></Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PropertyDetails;
