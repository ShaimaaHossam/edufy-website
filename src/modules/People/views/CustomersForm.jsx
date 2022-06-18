import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setPeopleFilters } from "../state";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";
import { useGetAllUnitsByUserTypeQuery } from "../../../redux/services/units";
import { useGetPropertiesListQuery } from "../../../redux/services/properties";
import {
  useAddCustomerMutation,
  useUpdateUser1Mutation,
  useGetUserQuery,
} from "../../../redux/services/people";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Tooltip,
} from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import TextInput from "../../../shared/components/inputs/TextInput";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import { mdiPlusCircleOutline, mdiAlertCircle } from "@mdi/js";

import { USER_TYPES } from "../../../constants/global";

function CustomersForm({ formType }) {
  const { t } = useTranslation("people");

  const { customerID } = useParams();

  const [propertyShown, setPropertyShown] = useState(true);
  const navigate = useNavigate();

  const [addCustomer] = useAddCustomerMutation();
  const [updateUser1] = useUpdateUser1Mutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      user_type: USER_TYPES.customer,
      property_ids: "",
      unit_ids: [],
      monthly_cap: 10,
    },

    validationSchema: Yup.object({
      name: Yup.string().required(t("requiredField")),
      email: Yup.string()
        .email(t("invalidEmailFormat"))
        .required(t("requiredField")),
      phone: Yup.string()
        .min(10, t("invalidPhoneNumber"))
        .required(t("requiredField")),
      role: Yup.string().required(t("requiredField")),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (formType === "add" || formType === "clone") {
        const { property_ids, ...formData } = values;
        addCustomer(formData)
          .unwrap()
          .then(() => navigate("/people"))
          .catch(({ data: { errors } }) => setErrors(errors));
      }

      if (formType === "edit") {
        const { email, phone, name,property_ids, ...formData } = values;
        console.log("formData", formData)
        if (email !== user.email) {
          Object.assign(formData, { email: email });
        }
        if (phone !== user.phone) {
          Object.assign(formData, { phone: phone });
        }
        if (name !== user.name) {
          Object.assign(formData, { name: name });
        }
        updateUser1({ id: user.id, formData })
          .unwrap()
          .then((data) => navigate("/people"))
          .catch(({ data: { errors } }) => setErrors(errors));
      }
    },
  });

  const { setValues } = formik;

  const { data: listProperties = [] } = useGetPropertiesListQuery();

  const { data: allRoles = [] } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.customer
  );

  const { data: allUnits = [] } = useGetAllUnitsByUserTypeQuery(
    formik.values.property_ids,
    { skip: !formik.values.property_ids }
  );

  console.log("unit_ids",  formik.values.unit_ids)
  const { isFetching, data: user } = useGetUserQuery(customerID, {
    skip: !customerID,
  });


  useEffect(() => {
    if (formType === "add" || isFetching || !user) return;

    setValues({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      user_type: USER_TYPES.customer,
      unit_ids: user.unit_ids,
      property_ids: user.property_ids,

    });

    if (formType === "clone") {
      setValues({
        name: "",
        email: "",
        phone: "",
        role: user.role,
        user_type: USER_TYPES.customer,
        unit_ids: user.unit_ids,
        property_ids: user.property_ids,
        monthly_cap: 10,

      });
    }
  }, [formType, isFetching, user, setValues]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("people"), url: "/people" }]} />

        <Typography component="h1" variant="h5">
          {t(`${formType}CustomersFormTitle`)}
        </Typography>
      </Grid>

      <Grid item>
        <Paper sx={{ py: 4, px: 3 }}>
          <Grid
            container
            spacing={5}
            direction="column"
            sx={{
              width: { xs: "100%", lg: 760 },
              mx: "auto",
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("customerInformation")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="name"
                  label={t("customerName")}
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="email"
                  label={t("email")}
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="phone"
                  label={t("phoneNumber")}
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("customerRole")}
                </Typography>
              </Grid>

              <Grid item xs={12} my={-1}>
                <FormControl>
                  <RadioGroup
                    column
                    name="role"
                    aria-labelledby="radio-group-label"
                    value={formik.values.role}
                    onChange={(_, value) => formik.setFieldValue("role", value)}
                  >
                    {allRoles?.map((role) => {
                      return (
                        <Grid item key={role.name}>
                          <FormControlLabel
                            label={role.name}
                            value={role.name}
                            control={<Radio />}
                          />
                           <Tooltip
                            title={
                              <Box padding={2}>
                                {role.permissions.map((per) => {
                                  return <Typography>{per.name}</Typography>;
                                })}
                              </Box>
                            }
                          >
                            <IconButton
                              aria-label="info"
                              icon={mdiAlertCircle}
                              size="small"
                              shape="rounded"
                              variant="contained"
                              color="primary"
                            />
                          </Tooltip>
                        </Grid>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("assignUnitOptional")}
                </Typography>
              </Grid>
              {propertyShown ? (
                <Grid item width="100%">
                  <Typography component="p" variant="p" color="text.secondary">
                    {t("assignOptionalUnitLabel")}
                  </Typography>
                  <Link to="" onClick={() => setPropertyShown(!propertyShown)}>
                    <Icon
                      aria-label="toggle properties visibility"
                      icon={mdiPlusCircleOutline}
                      size="small"
                      shape="rounded"
                      variant="contained"
                    />
                    <Typography component="span" ml={2}>
                      {t("assignUnit")}
                    </Typography>
                  </Link>
                </Grid>
              ) : (
                <Grid item container spacing={3} r width="100%">
                  <Grid item xs={12}>
                    <Autocomplete
                      name="property_ids"
                      label={t("property")}
                      noOptionsText={t("noTypes")}
                      options={listProperties?.map((type) => ({
                        value: type.id,
                        label: type.title,
                      }))}
                      value={formik.values.property_ids}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.property_ids &&
                        !!formik.errors.property_ids
                      }
                      helperText={
                        formik.touched.property_ids &&
                        formik.errors.property_ids
                      }
                    />
                  </Grid>

                  {formik.values.property_ids && (
                    <Grid item xs={12}>
                      <Autocomplete
                        name="unit_ids"
                        isMulti={true}
                        label={t("unitNama")}
                        noOptionsText={t("noTypes")}
                        options={allUnits?.map((type) => ({
                          value: type.id,
                          label: type.title,
                        }))}
                        value={formik.values.unit_ids}
                        onChange={(e)=>{
                          formik.setFieldValue("unit_ids", [...formik.values.unit_ids, e.target.value])
                          console.log("e", formik.values.unit_ids)
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.unit_ids && !!formik.errors.unit_ids
                        }
                        helperText={
                          formik.touched.unit_ids && formik.errors.unit_ids
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>

            <Grid item alignSelf="flex-end">
              <Button
                color={formType === "edit" ? "success" : "primary"}
                type="submit"
              >
                {formType === "edit" ? t("saveChanges") : t("createUser")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CustomersForm;
