import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setCustomerFilters } from "../state";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { Grid, Paper, Typography, Button, Collapse } from "@mui/material";

import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Link from "../../../shared/components/Link";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import { mdiPlus } from "@mdi/js";

import CustomersTable from "../components/CustomersTable";

import { USER_TYPES } from "../../../constants/global";

function Customers() {
  const { t } = useTranslation("people");

  const dispatch = useDispatch();
  const { customerFilters } = useSelector(peopleSelector);

  const { data: allRoles = [] } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.customer
  );

  const formik = useFormik({
    initialValues: {
      userRole: "",
    },
  });

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h5">
          {t("customers")}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ p: 3 }}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item sx={{ width: 320 }}>
              <SearchInput
                size="small"
                label={t("searchUser")}
                placeholder={t("user")}
                onChange={(keyword) => {
                  dispatch(
                    setCustomerFilters({
                      ...customerFilters,
                      "filter[keyword]": keyword,
                    })
                  );
                }}
              />
            </Grid>

            <Grid item sx={{ width: 320 }}>
              <Autocomplete
                size="small"
                name="userRole"
                label={t("byUserRole")}
                noOptionsText={t("noTypes")}
                options={allRoles?.map((type) => ({
                  value: type.name,
                  label: type.name,
                }))}
                value={formik.values.userRole}
                onChange={(e) => {
                  formik.setFieldValue("userRole", e.target.value);
                  dispatch(
                    setCustomerFilters({
                      ...customerFilters,
                      "filter[role]": e.target.value,
                    })
                  );
                }}
              />
            </Grid>

            <Grid item sx={{ ml: "auto" }}>
              <Button
                startIcon={<Icon icon={mdiPlus} />}
                component={Link}
                to="/people/customers/add"
              >
                {t("newUser")}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <CustomersTable />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Customers;
