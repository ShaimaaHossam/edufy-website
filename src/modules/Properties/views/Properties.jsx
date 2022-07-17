import { useState } from "react";

import usePermissions from "../../../shared/hooks/usePermissions";

import { useSelector, useDispatch } from "react-redux";
import { filtersSelector, setFilters } from "../state/propertiesFiltersSlice";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography, Button, Collapse } from "@mui/material";

import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiTune, mdiPlus } from "@mdi/js";

import PropertiesTable from "../components/PropertiesTable";
import PropertiesFilters from "../components/PropertiesFilters";

function Properties() {
  const { t } = useTranslation("properties");

  const propertiesPerms = usePermissions("property");

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("properties")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 320 }}>
              <SearchInput
                size="small"
                label={t("searchProperties")}
                placeholder={t("propertyOrManager")}
                onChange={(keyword) =>
                  dispatch(
                    setFilters({ ...filters, "filter[keyword]": keyword })
                  )
                }
              />
            </Grid>

            <Grid item>
              <IconButton
                aria-label="toggle filters visibility"
                icon={mdiTune}
                size="large"
                shape="rounded"
                variant="contained"
                color={filtersShown ? "primary" : "default"}
                onClick={(e) => setFiltersShown(!filtersShown)}
              />
            </Grid>
            {propertiesPerms.create && (
              <Grid item sx={{ ml: "auto" }}>
                <Button
                  startIcon={<Icon icon={mdiPlus} />}
                  component={Link}
                  to="/properties/add"
                >
                  {t("addProperty")}
                </Button>
              </Grid>
            )}

            <Grid item xs={12}>
              <Collapse in={filtersShown}>
                <PropertiesFilters />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <PropertiesTable />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Properties;
