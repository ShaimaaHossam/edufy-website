import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { propertiesSelector, setUnitsFilters } from "../state";

import {
  useGetUnitsQuery,
  useUpdateUnitMutation,
} from "../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import { mdiPencil, mdiContentCopy, mdiMinus } from "@mdi/js";

import Table from "../../../shared/components/Table";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import Switch from "../../../shared/components/inputs/Switch";

import NoContent from "../../../shared/views/NoContent";

import { UNIT_CUSTOMER_TYPES } from "../../../constants/system";

function UnitsTable() {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();

  const dispatch = useDispatch();
  const { unitsFilters } = useSelector(propertiesSelector);

  const { isLoading, data: units } = useGetUnitsQuery({
    "filter[property_id]": propertyID,
    ...unitsFilters,
  });
  const [updateUnit] = useUpdateUnitMutation();

  if (isLoading) return null;

  const tableLabels = [
    t("name"),
    t("type"),
    t("roomsNo"),
    t("customer"),
    t("totalSpent"),
    t("actions"),
  ];
  const tableData = units?.data?.map((item) => ({
    id: item.id,
    active: item.active,

    rowCells: [
      <Typography component="span" variant="body2" color="primary">
        {item.title}
      </Typography>,

      <Typography component="span" variant="body2" color="primary">
        {item.unit_type.title}
      </Typography>,

      <Typography component="span" variant="body2">
        {t("rooms_count", { count: item.number_of_rooms })}
      </Typography>,

      item.customer ? (
        <>
          <Typography component="span" variant="caption" color="text.secondary">
            {item.customer_type_id === UNIT_CUSTOMER_TYPES.owner
              ? t("owner")
              : t("tenant")}
          </Typography>
          <Typography display="block" component="span" variant="body2">
            {item.customer.name}
          </Typography>
        </>
      ) : (
        <Icon icon={mdiMinus} color="action" />
      ),

      <Typography component="span" variant="body2">
        {item.total_spent} {t("sr")}
      </Typography>,

      <Grid container onClick={(e) => e.stopPropagation()}>
        <Grid item>
          <IconButton
            aria-label="edit unit"
            size="small"
            icon={mdiPencil}
            disabled={!item.active}
            component={Link}
            to={`/properties/units/edit/${item.id}`}
            state={{ propertyID }}
          />
        </Grid>

        <Grid item>
          <IconButton
            aria-label="clone unit"
            size="small"
            icon={mdiContentCopy}
            disabled={!item.active}
            component={Link}
            to={`/properties/units/clone/${item.id}`}
            state={{ propertyID }}
          />
        </Grid>

        <Grid item sx={{ textAlign: "center", ml: 0.5, mt: 0.5 }}>
          <Switch
            color="primary"
            checked={item.active}
            onChange={() => updateUnit({ id: item.id, active: !item.active })}
          />
          <Typography component="span" variant="caption" display="block">
            {item.active ? t("active") : t("inactive")}
          </Typography>
        </Grid>
      </Grid>,
    ],
  }));

  return !!tableData?.length ? (
    <Table
      tableLabel="units list"
      headLabels={tableLabels}
      rowsData={tableData}
      metadata={{
        total: units.meta.total,
        pages: units.meta.lastPage,
        perPage: units.meta.perPage,
        currentPage: units.meta.currentPage,
      }}
      onPageChange={(page, perPage) =>
        dispatch(setUnitsFilters({ ...units, page, perPage }))
      }
    />
  ) : (
    <NoContent />
  );
}

export default UnitsTable;
