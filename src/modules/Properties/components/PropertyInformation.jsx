import { useParams } from "react-router-dom";

import usePermissions from "../../../shared/hooks/usePermissions";

import { useGetPropertyQuery } from "../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Box, Divider, Typography } from "@mui/material";
import { mdiPencil } from "@mdi/js";

import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import ServicesTableList from "../../../shared/components/modules/services/ServicesTableList";

import { DEF_IMGS } from "../../../constants/images";
import { WALLET_TYPES } from "../../../constants/system";

function PropertyInformation() {
  const { t } = useTranslation("properties");

  const  propertiesPerms = usePermissions("property");

  const { propertyID } = useParams();
  const { data: property } = useGetPropertyQuery(propertyID);

  return (
    <>
      <Grid container direction="column" alignItems="center" mb={4}>
        {propertiesPerms.update && (
          <Grid item xs={12} sx={{ alignSelf: "flex-end" }}>
            <IconButton
              aria-label="edit property"
              icon={mdiPencil}
              size="large"
              variant="contained"
              component={Link}
              to={`/properties/edit/${propertyID}`}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Box
            component="img"
            alt="property image"
            src={DEF_IMGS.property}
            width={60}
            display="block"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography component="h2" variant="subtitle1" mt={1.5}>
            {property.title}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} component="dl">
        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("type")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {property.property_type.title}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("subtype")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {property.property_subtype.title}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("unitsNo")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {t("units_count", { count: property.number_of_units })}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("services")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          {!!property.services && (
            <ServicesTableList
              services={property.services
                .filter((s) => s.active && s.checked)
                .map((s) => ({
                  id: s.service_id,
                  name: s.service_name,
                }))}
            />
          )}
        </Grid>
      </Grid>

      <Divider orientation="horizontal" sx={{ my: 3, borderColor: "border" }} />

      <Grid container spacing={2} component="dl">
        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("propertyManager")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {property.property_manager.name}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("areaManager")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {property.area_manager.name}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("maxSpendings")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          {property.wallet_type_id === WALLET_TYPES.restricted ? (
            <>
              <Typography component="span" variant="body2" color="text.primary">
                {property.wallet_amount} {t("sr")}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                display="block"
              >
                {`(${t("restricted")})`}
              </Typography>
            </>
          ) : (
            <Typography component="span" variant="body2" color="text.primary">
              {t("unlimited")}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Divider orientation="horizontal" sx={{ my: 3, borderColor: "border" }} />

      <Grid container spacing={2} component="dl">
        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("completedOrders")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {t("orders_count", { count: property.number_of_completed_orders })}
          </Typography>
        </Grid>

        <Grid item xs={6} component="dt">
          <Typography component="span" variant="body2" color="text.secondary">
            {t("totalSpent")}
          </Typography>
        </Grid>
        <Grid item xs={6} component="dd">
          <Typography component="span" variant="body2" color="text.primary">
            {property.total_spent} {t("sr")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PropertyInformation;
