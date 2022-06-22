import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";
import { useGetAllUnitsQuery } from "../../../redux/services/properties";
import { useGetAllPropertiesQuery } from "../../../redux/services/properties";
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
  Paper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
} from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import PermissionsTooltip from "../components/PermissionsTooltip";
import TextInput from "../../../shared/components/inputs/TextInput";
import Icon from "../../../shared/components/Icon";
import IconButton from "../../../shared/components/IconButton";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Radio from "../../../shared/components/inputs/Radio";
import { mdiPlusCircleOutline as PlusIcon, mdiAlertCircle } from "@mdi/js";

import { USER_TYPES } from "../../../constants/system";

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
      property_ids: [],
      unit_ids: [],
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t("invalidName.charactersNumber"))
        .required(t("requiredField"))
        .matches(/^[aA-zZ\s]+$/, t("invalidName.alphabets")),
      email: Yup.string()
        .email(t("invalidEmailFormat"))
        .required(t("requiredField")),
      phone: Yup.string()
        .min(10, t("invalidPhoneNumber"))
        .required(t("requiredField")),
      role: Yup.string(),
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
        const { email, phone, name, property_ids, ...formData } = values;
        if (email !== user.email) {
          Object.assign(formData, { email: email });
        }
        if (phone !== user.phone) {
          Object.assign(formData, { phone: phone });
        }
        if (name !== user.name) {
          Object.assign(formData, { name: name });
        }
        updateUser1({ id: user.id, ...formData })
          .unwrap()
          .then(() => navigate("/people"))
          .catch(({ data: { errors } }) => setErrors(errors));
      }
    },
  });

  const { setValues } = formik;

  const { data: listProperties = [] } = useGetAllPropertiesQuery();

  const { data: allRoles = [] } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.customer,
    { refetchOnMountOrArgChange: true }
  );

  const { data: allUnits = [] } = useGetAllUnitsQuery(
    { "filter[property_id]": formik.values.property_ids },
    { skip: !formik.values.property_ids }
  );

  const { isFetching, data: user } = useGetUserQuery(customerID, {
    skip: !customerID,
  });

  useEffect(() => {
    if (formType === "add" || isFetching || !user) return;

    setValues({
      name: formType === "clone" ? "" : user.name,
      email: formType === "clone" ? "" : user.email,
      phone: formType === "clone" ? "" : user.phone,
      role: user.role,
      user_type: USER_TYPES.customer,
      unit_ids:
        user.units.length === 0 ? [] : user.units.map((unit) => unit.id),
      property_ids: user.units.length === 0 ? [] : user?.units[0].property_id,
    });
  }, [formType, isFetching, user, setValues]);

  if ((formType === "edit" && !user) || (formType === "clone" && !user))
    return null;

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
                  {t("customerRoleLable")}
                </Typography>
              </Grid>

              <Grid item xs={12} my={-1}>
                <FormControl error={!!formik.errors.role} variant="standard">
                  <RadioGroup
                    column="true"
                    name="role"
                    aria-labelledby="radio-group-label"
                    value={formik.values.role}
                    onChange={(_, value) => formik.setFieldValue("role", value)}
                  >
                    {allRoles?.map((role) => {
                      return (
                        <Grid item key={role.name}>
                          <FormControlLabel
                            label={t(`customerRole.${role.name}`)}
                            value={role.name}
                            control={<Radio />}
                          />
                          <PermissionsTooltip
                            permissions={role.permissions}
                            noPermissions={t("noPermissions")}
                          >
                            <>
                              <IconButton
                                aria-label="info"
                                icon={mdiAlertCircle}
                                size="small"
                                shape="rounded"
                                variant="contained"
                                color="primary"
                                sx={{
                                  "&::before": {
                                    content: "none",
                                  },
                                }}
                              />
                            </>
                          </PermissionsTooltip>
                        </Grid>
                      );
                    })}
                  </RadioGroup>
                  <FormHelperText>
                    {formik.values.role === "" ? formik.errors.role : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("assignUnitOptional")}
                </Typography>
              </Grid>
              {(propertyShown && formType === "add") ||
              (propertyShown && user.units.length === 0) ? (
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      component="p"
                      variant="p"
                      color="text.secondary"
                    >
                      {t("assignOptionalUnitLabel")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => setPropertyShown(!propertyShown)}
                      startIcon={<Icon icon={PlusIcon} />}
                    >
                      {t("assignUnit")}
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid item container xs={12} spacing={3}>
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
                        noOptionsText={t("noUnits")}
                        options={allUnits?.map((type) => ({
                          value: type.id,
                          label: type.title,
                        }))}
                        value={formik.values.unit_ids}
                        onChange={formik.handleChange}
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
