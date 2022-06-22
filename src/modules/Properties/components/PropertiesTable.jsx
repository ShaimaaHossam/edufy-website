import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { propertiesSelector, setPropertiesFilters } from "../state";

import {
  useGetPropertiesQuery,
  useUpdatePropertyMutation,
} from "../../../redux/services/properties";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import { mdiPencil, mdiContentCopy } from "@mdi/js";

import Table from "../../../shared/components/Table";
import IconButton from "../../../shared/components/IconButton";
import Link from "../../../shared/components/Link";
import Switch from "../../../shared/components/inputs/Switch";
import ServicesTableList from "../../../shared/components/modules/services/ServicesTableList";

import NoContent from "../../../shared/views/NoContent";

import { WALLET_TYPES } from "../../../constants/system";

function PropertiesTable() {
  const { t } = useTranslation("properties");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { propertiesFilters } = useSelector(propertiesSelector);

  const { isLoading, data: properties } =
    useGetPropertiesQuery(propertiesFilters);
  const [updateProperty] = useUpdatePropertyMutation();

  const tableLabels = [
    t("name"),
    t("type"),
    t("unitsNo"),
    t("wallet"),
    t("totalSpent"),
    t("completedOrders"),
    t("propertyManager"),
    t("city"),
    t("services"),
    t("actions"),
  ];
  const tableData = properties?.data?.map((item) => ({
    id: item.id,
    active: item.active,
    clickable: true,
    onClick: () => navigate(`/properties/${item.id}`),
    rowCells: [
      <Link to={`/properties/${item.id}`} onClick={(e) => e.stopPropagation()}>
        <Typography component="span" variant="body2" color="primary">
          {item.title}
        </Typography>
      </Link>,

      <Typography component="span" variant="body2" color="primary">
        {item.property_type.title}
      </Typography>,

      <Typography component="span" variant="body2">
        {t("units_count", { count: item.number_of_units })}
      </Typography>,

      item.wallet_type_id === WALLET_TYPES.restricted ? (
        <>
          <Typography component="span" variant="body2">
            {item.wallet_amount} {t("sr")}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            display="block"
            color="primary"
          >
            {t("restricted")}
          </Typography>
        </>
      ) : (
        <Typography component="span" color="primary" variant="body2">
          {t("unlimited")}
        </Typography>
      ),

      <Typography component="span" variant="body2">
        {item.total_spent} {t("sr")}
      </Typography>,

      <Typography component="span" variant="body2">
        {t("orders_count", { count: item.number_of_completed_orders })}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.property_manager.name}
      </Typography>,

      <Typography component="span" variant="body2">
        {item.city.title}
      </Typography>,

      !!item.services && (
        <ServicesTableList
          services={item.services
            .filter((s) => s.active && s.checked)
            .map((s) => ({
              id: s.service_id,
              name: s.service_name,
            }))}
        />
      ),

      <Grid container onClick={(e) => e.stopPropagation()}>
        <Grid item>
          <IconButton
            aria-label="edit property"
            size="small"
            icon={mdiPencil}
            disabled={!item.active}
            component={Link}
            to={`/properties/edit/${item.id}`}
          />
        </Grid>

        <Grid item>
          <IconButton
            aria-label="clone property"
            size="small"
            icon={mdiContentCopy}
            disabled={!item.active}
            component={Link}
            to={`/properties/clone/${item.id}`}
          />
        </Grid>

        <Grid item sx={{ textAlign: "center", ml: 0.5, mt: 0.5 }}>
          <Switch
            color="primary"
            checked={item.active}
            onChange={() =>
              updateProperty({ id: item.id, active: !item.active })
            }
          />
          <Typography component="span" variant="caption" display="block">
            {item.active ? t("active") : t("inactive")}
          </Typography>
        </Grid>
      </Grid>,
    ],
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="properties list"
      headLabels={tableLabels}
      rowsData={tableData}
      metadata={{
        total: properties.meta.total,
        pages: properties.meta.lastPage,
        perPage: properties.meta.perPage,
        currentPage: properties.meta.currentPage,
      }}
      onPageChange={(page, perPage) =>
        dispatch(setPropertiesFilters({ ...propertiesFilters, page, perPage }))
      }
    />
  ) : (
    <NoContent />
  );
}

export default PropertiesTable;
