import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { peopleSelector, setPeopleFilters } from "../state";

import { useGetAllRolesByUserTypeQuery } from "../../../redux/services/roles";
import { useGetPropertiesListQuery } from "../../../redux/services/properties";
import { useAddTeamMemberMutation } from "../../../redux/services/people";

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
  RadioGroup,
} from "@mui/material";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import TextInput from "../../../shared/components/inputs/TextInput";
import Icon from "../../../shared/components/Icon";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import { mdiPlusCircleOutline } from "@mdi/js";

import { USER_TYPES } from "../../../constants/global";

function TeamMembersForm({ formType }) {
  const { t } = useTranslation("people");
  const [propertyShown, setPropertyShown] = useState(true);

  const navigate = useNavigate();

  const [addTeamMember] = useAddTeamMemberMutation();

  const { data: listProperties } = useGetPropertiesListQuery();
  const { data: allRoles } = useGetAllRolesByUserTypeQuery(
    USER_TYPES.teamMember
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      wallet_amount: null,
      monthly_cap: "",
      user_type: USER_TYPES.teamMember,
      property_ids: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(t("requiredField")),
      email: Yup.string()
        .email(t("invalidEmailFormat"))
        .required(t("requiredField")),
      phone: Yup.string()
        .max(10, t("invalidPhoneNumber"))
        .required(t("requiredField")),
      role: Yup.string().required(t("requiredField")),
      wallet_amount: Yup.number().required(t("requiredField")),
      monthly_cap: Yup.number().required(t("requiredField")),
    }),
  });
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("people"), url: "/people" }]} />

        <Typography component="h1" variant="h5">
          {t(`${formType}PeopleFormTitle`)}
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
                  {t("teamMemberRole")}
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
                    formik.touched.monthly_cap &&
                    !!formik.errors.monthly_cap
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

              {propertyShown ? (
                <Grid item width="100%">
                  <Typography component="p" variant="p" color="text.secondary">
                    {t("assignOptionalPropertyLabel")}
                  </Typography>
                  <Link to="" onClick={() => setPropertyShown(!propertyShown)}>
                    <Icon
                      aria-label="toggle properties visibility"
                      icon={mdiPlusCircleOutline}
                      size="small"
                      shape="rounded"
                      variant="contained"
                    />
                    <Typography  component="span" ml={2}>{t("assignProperty")}</Typography>
                  </Link>
                </Grid>
              ) : (
                <Grid item width="100%">
                  <Autocomplete
                    name="property_ids"
                    isMulti={true}
                    label={t("property")}
                    noOptionsText={t("noTypes")}
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
                color="primary"
                onClick={() => {
                  addTeamMember(formik.values);
                  navigate("/people")
                }}
              >
                {t("createUser")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TeamMembersForm;
