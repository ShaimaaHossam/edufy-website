import { useState } from "react";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  setFilters,
} from "../../state/propertiesFiltersSlice";

import { useTranslation } from "react-i18next";

import { Grid, Button, Collapse } from "@mui/material";
import { mdiTune, mdiPlus } from "@mdi/js";

import Icon from "../../../../shared/components/Icon";
import IconButton from "../../../../shared/components/IconButton";
import Link from "../../../../shared/components/Link";
import SearchInput from "../../../../shared/components/inputs/SearchInput";

import UnitsTable from "../../components/UnitsTable";
import UnitsFilters from "../../components/UnitsFilters";

function Units() {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();

  const dispatch = useDispatch();
  const { filters } = useSelector(filtersSelector);

  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid item sx={{ width: 320 }}>
        <SearchInput
          size="small"
          label={t("searchUnits")}
          placeholder={t("unitName")}
          onChange={(keyword) =>
            dispatch(setFilters({ ...filters, "filter[keyword]": keyword }))
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

      <Grid item sx={{ ml: "auto" }}>
        <Button
          startIcon={<Icon icon={mdiPlus} />}
          component={Link}
          to="/properties/units/add"
          state={{ propertyID }}
        >
          {t("addUnit")}
        </Button>
      </Grid>

      {/* <Grid item>
        <Menu
          label="units options"
          AnchorComponent={IconButton}
          AnchorComponentProps={{
            size: "large",
            shape: "rounded",
            variant: "contained",
            icon: mdiDotsVertical,
          }}
          AnchorComponentOpenProps={{ color: "primary" }}
        >
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <Icon icon={mdiMicrosoftExcel} size="small" />
            </ListItemIcon>

            <ListItemText>{t("downloadUnitsForm")}</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <Icon icon={mdiMicrosoftExcel} size="small" />
            </ListItemIcon>

            <ListItemText>{t("uploadUnitsForm")}</ListItemText>
          </MenuItem>
        </Menu>
      </Grid> */}

      <Grid item xs={12}>
        <Collapse in={filtersShown}>
          <UnitsFilters />
        </Collapse>
      </Grid>

      <Grid item xs={12}>
        <UnitsTable />
      </Grid>
    </Grid>
  );
}

export default Units;
