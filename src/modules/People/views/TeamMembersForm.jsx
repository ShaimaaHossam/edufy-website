import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";
import { useGetAllPropertiesQuery } from "../../../redux/services/properties";
import {
  useAddTeamMemberMutation,
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
  Box,
} from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import PermissionsTooltip from "../components/PermissionsTooltip";
import TextInput from "../../../shared/components/inputs/TextInput";
import Icon from "../../../shared/components/Icon";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import { mdiPlusCircleOutline as PlusIcon, mdiAlertCircle } from "@mdi/js";

import { USER_TYPES } from "../../../constants/system";

function TeamMembersForm({ formType }) {
  const { t } = useTranslation("people");

  const { teamMemberID } = useParams();

  const [propertyShown, setPropertyShown] = useState(true);
  const navigate = useNavigate();

  const { isFetching, data: user } = useGetUserQuery(teamMemberID, {
    skip: !teamMemberID,
  });

  const [addTeamMember] = useAddTeamMemberMutation();
  const [updateUser1] = useUpdateUser1Mutation();

  const { data: listProperties = [] } = useGetAllPropertiesQuery();
  const { data: allRoles = [] } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.teamMember,
    { refetchOnMountOrArgChange: true }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      monthly_cap: "",
      user_type: USER_TYPES.teamMember,
      property_ids: [],
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
      monthly_cap: Yup.number().required(t("requiredField")),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (formType === "add" || formType === "clone") {
        addTeamMember(values)
          .unwrap()
          .then(() => navigate("/people"))
          .catch(({ data: { errors } }) => setErrors(errors));
      }

      if (formType === "edit") {
        const { email, phone, name, ...formData } = values;
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

  useEffect(() => {
    if (formType === "add" || isFetching || !user) return;

    setValues({
      name: formType === "clone" ? "" : user.name,
      email: formType === "clone" ? "" : user.email,
      phone: formType === "clone" ? "" : user.phone,
      role: user.role,
      monthly_cap: user.monthly_cap,
      user_type: USER_TYPES.teamMember,
      property_ids:
        user.properties.length === 0
          ? []
          : user.properties.map((property) => property.id),
    });
  }, [formType, isFetching, user, setValues]);

  if ((formType === "edit" && !user) || (formType === "clone" && !user))
    return null;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs
          items={[{ label: t("teamMembers"), url: "/people/team" }]}
        />

        <Typography component="h1" variant="h5">
          {t(`${formType}TeamMembersFormTitle`)}
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
                  {t("teamMemberInformation")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="name"
                  label={t("name")}
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
                  {t("teamMemberRoleLable")}
                </Typography>
              </Grid>

              <Grid item xs={12} my={-1}>
                <FormControl error={!!formik.errors.role} variant="standard">
                  <RadioGroup
                    name="role"
                    value={formik.values.role}
                    onChange={(_, value) => formik.setFieldValue("role", value)}
                  >
                    {allRoles?.map((role) => {
                      return !role.is_protected ? (
                        <Grid
                          item
                          container
                          alignItems="center"
                          key={role.name}
                        >
                          <FormControlLabel
                            label={t(`teamMemberRole.${role.name}`)}
                            value={role.name}
                            control={<Radio />}
                          />
                          <PermissionsTooltip
                            permissions={role.permissions}
                            noPermissions={t("noPermissions")}
                          >
                            <Box component="span">
                              <Icon
                                icon={mdiAlertCircle}
                                size="medium"
                                color="primary"
                              />
                            </Box>
                          </PermissionsTooltip>
                        </Grid>
                      ) : null;
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
                  {t("monyhlyCap")}
                </Typography>

                <Typography component="p" variant="p" color="text.secondary">
                  {t("adminApproval")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <NumberInput
                  required
                  name="monthly_cap"
                  label={t("walletBalance")}
                  unit={t("sr")}
                  value={formik.values.monthly_cap}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.monthly_cap && !!formik.errors.monthly_cap
                  }
                  helperText={
                    formik.touched.monthly_cap && formik.errors.monthly_cap
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("assignOptionalProperty")}
                </Typography>
              </Grid>

              {(propertyShown && formType === "add") ||
              (propertyShown && formik.values.property_ids.length === 0) ? (
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      component="p"
                      variant="p"
                      color="text.secondary"
                    >
                      {t("assignOptionalPropertyLabel")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => setPropertyShown(!propertyShown)}
                      startIcon={<Icon icon={PlusIcon} />}
                    >
                      {t("assignProperty")}
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Autocomplete
                    name="property_ids"
                    isMulti={true}
                    label={t("property")}
                    noOptionsText={t("noProperties")}
                    options={listProperties.map((type) => ({
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
                      formik.touched.property_ids && formik.errors.property_ids
                    }
                  />
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

export default TeamMembersForm;
