import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setCustomerFilters } from "../state";

import usePermissions from "../../../shared/hooks/usePermissions";

import {
  useGetUsersQuery,
  useUpdateUser1Mutation,
} from "../../../redux/services/people";

import { useTranslation } from "react-i18next";

import { Grid, Typography, Tooltip, Box, Button } from "@mui/material";
import { mdiPencil, mdiContentCopy, mdiMinus  } from "@mdi/js";

import Table from "../../../shared/components/Table";
import IconButton from "../../../shared/components/IconButton";
import Icon from "../../../shared/components/Icon";
import Link from "../../../shared/components/Link";
import Switch from "../../../shared/components/inputs/Switch";

import NoContent from "../../../shared/views/NoContent";

function CustomersTable() {
  const { t } = useTranslation("people");

  const peoplePerms = usePermissions("people");

  const dispatch = useDispatch();

  const { customerFilters } = useSelector(peopleSelector);

  const { isLoading, data: customer } = useGetUsersQuery(customerFilters);
  const [updateUser1] = useUpdateUser1Mutation();

  const tableLabels = [
    t("userName"),
    t("role"),
    t("unit"),
    t("email"),
    t("phoneNumber"),
    t("actions"),
  ];

  const tableData = customer?.data?.map((item) => ({
    id: item.id,
    active: item.active,
    clickable: false,
    rowCells: [
      <Typography component="span" variant="body2">
        {item.name}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.role}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.units.length ? (
          <>
            <Typography component="span" variant="body2">
              {item.units[0].title}
            </Typography>
            <Tooltip
              title={
                <Box padding={2}>
                  {item.units.map((unit) => {
                    return (
                      <Typography key={unit.title}>{unit.title}</Typography>
                    );
                  })}
                </Box>
              }
            >
              <Button
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: "25%",
                    opacity: 0.1,
                    backgroundColor: "currentColor",
                    borderRadius: 4,
                    width: 32,
                    height: 32,
                  },
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "white" },
                  color: "black",
                }}
              >
                {item.units.length}
              </Button>
            </Tooltip>
          </>
        ) : (
          <Typography component="span" variant="body2">
            {t("noUnits")}
          </Typography>
        )}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.email}
      </Typography>,
      <Typography component="span" variant="body2">
        {item.phone}
      </Typography>,
      <Grid container onClick={(e) => e.stopPropagation()}>
        {peoplePerms.update || peoplePerms.create ? (
          <>
            {peoplePerms.update && (
              <Grid item>
                <IconButton
                  aria-label="edit customer"
                  size="small"
                  icon={mdiPencil}
                  disabled={!item.active}
                  component={Link}
                  to={`/people/customers/edit/${item.id}`}
                />
              </Grid>
            )}
            
            {peoplePerms.create && (
              <Grid item>
                <IconButton
                  aria-label="clone customer"
                  size="small"
                  icon={mdiContentCopy}
                  disabled={!item.active}
                  component={Link}
                  to={`/people/customers/clone/${item.id}`}
                />
              </Grid>
            )}

            {peoplePerms.update && (
              <Grid item sx={{ textAlign: "center", ml: 0.5, mt: 0.5 }}>
                <Switch
                  color="primary"
                  checked={item.active}
                  onChange={() => {
                    updateUser1({ id: item.id, active: !item.active });
                  }}
                />
                <Typography component="span" variant="caption" display="block">
                  {item.active ? t("active") : t("inactive")}
                </Typography>
              </Grid>
            )}
          </>
        ) : (
          <Icon icon={mdiMinus } size="medium" color="action" />
        )}
      </Grid>,
    ],
  }));

  if (isLoading) return null;

  return !!tableData?.length ? (
    <Table
      tableLabel="customers list"
      headLabels={tableLabels}
      rowsData={tableData}
      metadata={{
        total: customer.meta.total,
        pages: customer.meta.lastPage,
        perPage: customer.meta.perPage,
        currentPage: customer.meta.currentPage,
      }}
      onPageChange={(page, perPage) =>
        dispatch(setCustomerFilters({ ...customerFilters, page, perPage }))
      }
    />
  ) : (
    <NoContent />
  );
}

export default CustomersTable;
