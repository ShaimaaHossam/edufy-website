import { useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import {
  setFilters,
  clearFilters,
  ordersFiltersSelector,
} from "../../../../redux/slices/ordersFilters";
import {
  useGetAllPropertiesQuery,
  useGetAllUnitsQuery,
} from "../../../../redux/services/properties";
import // useGetAllCompanyServicesQuery,
// useGetAllPropertyServicesQuery,
"../../../../redux/services/general";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Grid, Button } from "@mui/material";

import DatePicker from "../../inputs/DatePicker";
import Autocomplete from "../../inputs/Autocomplete";

import useDebouncedEffect from "../../../hooks/useDebouncedEffect";

import { formatDate } from "../../../../helpers/datetime";
import {
  USER_ROLES,
  ORDER_STATUSES,
  ORDER_TYPES,
} from "../../../../constants/system";
import { differenceInYears } from "date-fns";

const USER_ROLES_FILTERS = {
  admin: USER_ROLES.admin,
  areaManager: USER_ROLES.areaManager,
  propertyManager: USER_ROLES.propertyManager,
  unitOwner: USER_ROLES.unitOwner,
  unitTenant: USER_ROLES.unitTenant,
};

function OrdersFilters({ fixedFitlters, orderType }) {
  const {
    t,
    i18n: { language },
  } = useTranslation("orders");

  const dispatch = useDispatch();
  const { maintenanceFilters, cleaningFilters } = useSelector(
    ordersFiltersSelector
  );

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      from_date: null,
      to_date: null,
      creator_role: [],
      property_id: fixedFitlters?.propertyID || "",
      unit_id: [],
      service_id: [],
      status: [],
    },
    validationSchema: Yup.object().shape({
      due_date: Yup.date()
        .nullable()
        .typeError(t("invalidDate"))
        .test(
          "range",
          t("invalidDateRange"),
          (date) =>
            date &&
            differenceInYears(date, Date.now()) > -2 &&
            differenceInYears(date, Date.now()) < 2
        ),
    }),
  });

  // const { values, validateForm } = formik;
  // useDebouncedEffect(
  //   () => {
  //     validateForm().then((errors) => {
  //       if (Object.values(errors)) return;

  //       dispatch(
  //         setFilters({
  //           key:
  //             orderType === ORDER_TYPES.maintenance
  //               ? "maintenanceFilters"
  //               : "cleaningFilters",
  //           value:
  //             orderType === ORDER_TYPES.maintenance
  //               ? {
  //                   ...maintenanceFilters,
  //                   page: "1",
  //                   "filters[due_date]": formatDate(values.due_date),
  //                   "filters[creator_role]": values.creator_role,
  //                   "filters[property_id]": values.property_id,
  //                   "filters[unit_id]": values.unit_id,
  //                   "filters[service_id]": values.service_id,
  //                   "filters[status]": values.status,
  //                 }
  //               : {
  //                   ...cleaningFilters,
  //                   page: "1",
  //                   "filters[due_date]": formatDate(values.due_date),
  //                   "filters[creator_role]": values.creator_role,
  //                   "filters[property_id]": values.property_id,
  //                   "filters[unit_id]": values.unit_id,
  //                   "filters[service_id]": values.service_id,
  //                   "filters[status]": values.status,
  //                 },
  //         })
  //       );
  //     });
  //   },
  //   [values],
  //   500,
  //   true,
  //   false
  // );

  const { property_id: propertyID } = formik.values;

  const { data: allProperties = [] } = useGetAllPropertiesQuery();
  const { data: allUnits = [] } = useGetAllUnitsQuery(
    { "filters[property_id]": propertyID },
    { skip: !propertyID }
  );

  // const { data: allCompanyServices = [] } = useGetAllCompanyServicesQuery();
  // const { data: allPropertyServices = [] } = useGetAllPropertyServicesQuery(
  //   propertyID,
  //   { skip: !propertyID }
  // );

  useEffect(() => {
    return () => {
      formik.resetForm();
      dispatch(
        clearFilters(
          orderType === ORDER_TYPES.maintenance
            ? "maintenanceFilters"
            : "cleaningFilters"
        )
      );
    };
  }, [dispatch, orderType]);

  return (
    <Grid columns={12} container spacing={2} component="form">
      <Grid item xs={4} lg={true}>
        <DatePicker
          size="small"
          name="from_date"
          label={t("byStartDate")}
          value={formik.values.from_date}
          onChange={(e) => {
            formik.setFieldValue("from_date", e.target.value);
            dispatch(
              setFilters({
                key:
                  orderType === ORDER_TYPES.maintenance
                    ? "maintenanceFilters"
                    : "cleaningFilters",
                value:
                  orderType === ORDER_TYPES.maintenance
                    ? {
                        ...maintenanceFilters,
                        page: "1",
                        "filters[from_date]": formatDate(e.target.value),
                      }
                    : {
                        ...cleaningFilters,
                        page: "1",
                        "filters[from_date]": formatDate(e.target.value),
                      },
              })
            );
          }}
          onBlur={formik.handleBlur}
          error={!!formik.touched.from_date && !!formik.errors.from_date}
          helperText={!!formik.touched.from_date && formik.errors.from_date}
        />
      </Grid>
      <Grid item xs={4} lg={true}>
        <DatePicker
          size="small"
          name="to_date"
          label={t("byEndDate")}
          value={formik.values.to_date}
          onChange={(e) => {
            formik.setFieldValue("to_date", e.target.value);
            dispatch(
              setFilters({
                key:
                  orderType === ORDER_TYPES.maintenance
                    ? "maintenanceFilters"
                    : "cleaningFilters",
                value:
                  orderType === ORDER_TYPES.maintenance
                    ? {
                        ...maintenanceFilters,
                        page: "1",
                        "filters[to_date]": formatDate(e.target.value),
                      }
                    : {
                        ...cleaningFilters,
                        page: "1",
                        "filters[to_date]": formatDate(e.target.value),
                      },
              })
            );
          }}
          onBlur={formik.handleBlur}
          error={!!formik.touched.to_date && !!formik.errors.to_date}
          helperText={!!formik.touched.to_date && formik.errors.to_date}
        />
      </Grid>

      <Grid item xs={4} lg={true}>
        <Autocomplete
          size="small"
          name="creator_role"
          label={t("byCreatorRole")}
          isMulti
          limitTags={1}
          options={Object.keys(USER_ROLES_FILTERS).map((key) => ({
            value: USER_ROLES_FILTERS[key],
            label: t(key),
          }))}
          value={formik.values.creator_role}
          onChange={(e) => {
            formik.setFieldValue("creator_role", e.target.value);
            dispatch(
              setFilters({
                key:
                  orderType === ORDER_TYPES.maintenance
                    ? "maintenanceFilters"
                    : "cleaningFilters",
                value:
                  orderType === ORDER_TYPES.maintenance
                    ? {
                        ...maintenanceFilters,
                        page: "1",
                        "filters[creator_role]": e.target.value,
                      }
                    : {
                        ...cleaningFilters,
                        page: "1",
                        "filters[creator_role]": e.target.value,
                      },
              })
            );
          }}
          onBlur={formik.handleBlur}
        />
      </Grid>

      {!fixedFitlters?.propertyID && (
        <Grid item xs={4} lg={true}>
          <Autocomplete
            size="small"
            name="property_id"
            label={t("byProperty")}
            isSolo
            options={allProperties.map((property) => ({
              value: property.id,
              label: property.title,
            }))}
            noOptionsText={t("noProperties")}
            value={formik.values.property_id}
            onChange={(e) => {
              formik.setValues({
                ...formik.values,
                property_id: e.target.value,
                unit_id: [],
              });
              dispatch(
                setFilters({
                  key:
                    orderType === ORDER_TYPES.maintenance
                      ? "maintenanceFilters"
                      : "cleaningFilters",
                  value:
                    orderType === ORDER_TYPES.maintenance
                      ? {
                          ...maintenanceFilters,
                          page: "1",
                          "filters[property_id]": e.target.value,
                        }
                      : {
                          ...cleaningFilters,
                          page: "1",
                          "filters[property_id]": e.target.value,
                        },
                })
              );
            }}
            onBlur={formik.handleBlur}
          />
        </Grid>
      )}

      <Grid item xs={4} lg={true}>
        <Autocomplete
          size="small"
          name="unit_id"
          label={t("byUnit")}
          isMulti
          limitTags={1}
          options={allUnits.map((unit) => ({
            value: unit.id,
            label: unit.title,
          }))}
          noOptionsText={t("noUnits")}
          disabled={!formik.values.property_id}
          value={formik.values.unit_id}
          onChange={(e) => {
            formik.setFieldValue("unit_id", e.target.value);
            dispatch(
              setFilters({
                key:
                  orderType === ORDER_TYPES.maintenance
                    ? "maintenanceFilters"
                    : "cleaningFilters",
                value:
                  orderType === ORDER_TYPES.maintenance
                    ? {
                        ...maintenanceFilters,
                        page: "1",
                        "filters[unit_id]": e.target.value,
                      }
                    : {
                        ...cleaningFilters,
                        page: "1",
                        "filters[unit_id]": e.target.value,
                      },
              })
            );
          }}
          onBlur={formik.handleBlur}
        />
      </Grid>

      {/* <Grid item xs={4} lg={true}>
        <Autocomplete
          size="small"
          name="service_id"
          label={t("byService")}
          isMulti
          limitTags={1}
          options={(propertyID ? allPropertyServices : allCompanyServices).map(
            (service) => ({
              value: service.id,
              label: language === "en" ? service.name.en : service.name.ar,
            })
          )}
          noOptionsText={t("noServices")}
          value={formik.values.service_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid> */}

      <Grid item xs={4} lg={true}>
        <Autocomplete
          size="small"
          name="status"
          label={t("byOrderStatus")}
          isMulti
          limitTags={1}
          options={Object.keys(ORDER_STATUSES).map((key) => ({
            value: ORDER_STATUSES[key],
            label: t(key),
          }))}
          value={formik.values.status}
          onChange={(e) => {
            formik.setFieldValue("status", e.target.value);
            dispatch(
              setFilters({
                key:
                  orderType === ORDER_TYPES.maintenance
                    ? "maintenanceFilters"
                    : "cleaningFilters",
                value:
                  orderType === ORDER_TYPES.maintenance
                    ? {
                        ...maintenanceFilters,
                        page: "1",
                        "filters[status]": e.target.value,
                      }
                    : {
                        ...cleaningFilters,
                        page: "1",
                        "filters[status]": e.target.value,
                      },
              })
            );
          }}
          onBlur={formik.handleBlur}
        />
      </Grid>

      <Grid item>
        <Button
          type="reset"
          color="error"
          variant="outlined"
          onClick={() => {
            formik.resetForm();
            dispatch(
              clearFilters(
                orderType === ORDER_TYPES.maintenance
                  ? "maintenanceFilters"
                  : "cleaningFilters"
              )
            );
          }}
        >
          {t("clear")}
        </Button>
      </Grid>
    </Grid>
  );
}

OrdersFilters.propTypes = {
  fixedFitlters: PropTypes.shape({
    propertyID: PropTypes.string,
  }),
};

export default OrdersFilters;
