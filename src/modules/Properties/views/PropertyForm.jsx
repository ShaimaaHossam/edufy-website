import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useParams, useNavigate } from "react-router-dom";

import {
  useGetPropertyQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useGetAllPropertyTypesQuery,
  useGetAllPropertySubtypesQuery,
} from "../../../redux/services/properties";
import { useGetAllUsersByRoleQuery } from "../../../redux/services/people";
import { useGetAllCitiesQuery } from "../../../redux/services/general";

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

import useNavigationBlocker from "../../../shared/hooks/useNavigationBlocker";

import NotFound from "../../../shared/views/NotFound";

import Dialog from "../../../shared/components/Dialog";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Link from "../../../shared/components/Link";
import TextInput from "../../../shared/components/inputs/TextInput";
import Autocomplete from "../../../shared/components/inputs/Autocomplete";
import LocationInput from "../../../shared/components/inputs/LocationInput";
import Radio from "../../../shared/components/inputs/Radio";
import NumberInput from "../../../shared/components/inputs/NumberInput";

import { WALLET_TYPES, USER_ROLES } from "../../../constants/system";
import { getDeviceLocation } from "../../../helpers/maps";

function PropertyForm({ formType }) {
  const { t } = useTranslation("properties");

  const { propertyID } = useParams();
  const navigate = useNavigate();
  const [canLeave, setCanLeave] = useState(false);

  const { error, data: property } = useGetPropertyQuery(propertyID, {
    skip: !propertyID,
  });
  const [addProperty] = useAddPropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();

  const { data: allCities = [] } = useGetAllCitiesQuery();
  const { data: allPropertyManagers = [] } = useGetAllUsersByRoleQuery(
    USER_ROLES.propertyManager
  );
  const { data: allAreaManagers = [] } = useGetAllUsersByRoleQuery(
    USER_ROLES.areaManager
  );

  const formik = useFormik({
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues: {
      title: "",
      city_id: "",
      address: "",
      location: null,
      property_type_id: "",
      property_subtype_id: "",
      property_manager_id: "",
      area_manager_id: "",
      wallet_type_id: WALLET_TYPES.unlimited,
      wallet_amount: null,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, t("tooShortName"))
        .max(60, t("tooLongName"))
        .required(t("requiredField"))
        .test("cloneTest", t("nameShouldChange"), (title) => {
          if (formType !== "clone") return true;
          return title !== property?.title;
        }),
      city_id: Yup.string().required(t("requiredField")),
      address: Yup.string()
        .min(10, t("tooShortAddress"))
        .max(255, t("tooLongAddress"))
        .required(t("requiredField")),
      location: Yup.object()
        .nullable()
        .required(t("locationRequired"))
        .test("cloneTest", t("locationShouldChange"), (location) => {
          if (formType !== "clone") return true;
          return (
            location?.lat !== property?.location.lat ||
            location?.lng !== property?.location.lng
          );
        }),
      property_type_id: Yup.string().required(t("requiredField")),
      property_subtype_id: Yup.string().test(
        "opt required",
        t("requiredField"),
        function (type) {
          const propertyTypeID = this.parent.property_type_id;
          return !!propertyTypeID ? !!type : true;
        }
      ),
      property_manager_id: Yup.string().required(t("requiredField")),
      area_manager_id: Yup.string().required(t("requiredField")),
      wallet_type_id: Yup.number().required(t("requiredField")),
      wallet_amount: Yup.number()
        .nullable()
        .test("opt required", t("requiredField"), function (amount) {
          const walletType = this.parent.wallet_type_id;
          return walletType === WALLET_TYPES.restricted ? !!amount : true;
        })
        .test("out of range", t("walletOutOfRange"), function (amount) {
          const walletType = this.parent.wallet_type_id;
          return walletType === WALLET_TYPES.restricted
            ? amount >= 10000 && amount <= 500000
            : true;
        }),
    }),
    onSubmit: async (values, { setErrors }) => {
      const { title, property_type_id, property_subtype_id, ...formData } =
        values;

      if (formType === "edit") {
        Object.assign(formData, { id: propertyID });
        title !== property.title && Object.assign(formData, { title });
        updateProperty(formData)
          .unwrap()
          .then((data) => navigate(`/properties/${data.id}`))
          .catch(({ data: { errors } }) => {
            setErrors(errors);
            setCanLeave(false);
          });
      } else {
        Object.assign(formData, {
          title,
          property_type_id,
          property_subtype_id,
        });
        addProperty(formData)
          .unwrap()
          .then((data) => navigate(`/properties/${data.id}`))
          .catch(({ data: { errors } }) => {
            setErrors(errors);
            setCanLeave(false);
          });
      }
    },
  });

  const {
    values,
    resetForm,
    setFieldValue,
    values: { wallet_type_id: walletType, property_type_id: propertyTypeID },
  } = formik;

  const { data: allPropertyTypes = [] } = useGetAllPropertyTypesQuery();
  const { data: allPropertySubtypes = [] } = useGetAllPropertySubtypesQuery(
    propertyTypeID,
    { skip: !propertyTypeID }
  );

  // reset wallet amount if type changed to unlimited
  useEffect(() => {
    walletType === WALLET_TYPES.unlimited &&
      setFieldValue("wallet_amount", null);
  }, [walletType, setFieldValue]);

  // reset property subtype if property type is cleared
  useEffect(() => {
    !propertyTypeID && setFieldValue("property_subtype_id", "");
  }, [propertyTypeID, setFieldValue]);

  const valuesRef = useRef(values);
  useEffect(() => {
    if (formType === "add") {
      getDeviceLocation().then((location) => {
        resetForm({ values: { ...valuesRef.current, location } });
      });
      return;
    }

    if (!property) return;
    resetForm({
      values: {
        title: property.title,
        city_id: property.city.id,
        address: property.address,
        location: property.location,
        property_type_id: property.property_type.id,
        property_subtype_id: property.property_subtype.id,
        property_manager_id: property.property_manager.id,
        area_manager_id: property.area_manager.id,
        wallet_type_id: property.wallet_type_id,
        wallet_amount: property.wallet_amount || null,
      },
    });
  }, [formType, property, resetForm]);

  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  useNavigationBlocker(formik.dirty && !canLeave, () =>
    setLeaveDialogOpen(true)
  );

  if (error?.status === 404) return <NotFound />;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Breadcrumbs items={[{ label: t("properties"), url: "/properties" }]} />

        <Typography component="h1" variant="h5">
          {t(`${formType}PropertyFormTitle`)}
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
                  {t("propertyInformation")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="title"
                  label={t("name")}
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && !!formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  name="city_id"
                  label={t("city")}
                  options={allCities.map((city) => ({
                    value: city.id,
                    label: city.title,
                  }))}
                  noOptionsText={t("noCities")}
                  value={formik.values.city_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city_id && !!formik.errors.city_id}
                  helperText={formik.touched.city_id && formik.errors.city_id}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  required
                  name="address"
                  label={t("address")}
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>

              <Grid item xs={12}>
                <LocationInput
                  position={formik.values.location}
                  onPositionChange={(position) => {
                    formik.setFieldValue("location", position);
                    !formik.touched.location &&
                      formik.setFieldTouched("location", true);
                  }}
                />
                {formik.touched.location && !!formik.errors.location ? (
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    mt={1}
                  >
                    {formik.errors.location}
                  </Typography>
                ) : (
                  <Typography variant="body2" align="center" mt={1}>
                    {t("pickLocation")}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("propertyTypes")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  name="property_type_id"
                  label={t("propertyType")}
                  fixedValue={formType === "edit"}
                  options={allPropertyTypes.map((type) => ({
                    value: type.id,
                    label: type.title,
                  }))}
                  noOptionsText={t("noTypes")}
                  value={formik.values.property_type_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.property_type_id &&
                    !!formik.errors.property_type_id
                  }
                  helperText={
                    formik.touched.property_type_id &&
                    formik.errors.property_type_id
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  disabled={!formik.values.property_type_id}
                  name="property_subtype_id"
                  label={t("propertySubtype")}
                  fixedValue={formType === "edit"}
                  options={allPropertySubtypes.map((type) => ({
                    value: type.id,
                    label: type.title,
                  }))}
                  noOptionsText={t("noTypes")}
                  value={formik.values.property_subtype_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.property_subtype_id &&
                    !!formik.errors.property_subtype_id
                  }
                  helperText={
                    formik.touched.property_subtype_id &&
                    formik.errors.property_subtype_id
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" id="radio-group-label">
                  {t("walletType")}
                </Typography>
              </Grid>

              <Grid item xs={12} my={-1}>
                <FormControl>
                  <RadioGroup
                    row
                    name="wallet_type_id"
                    aria-labelledby="radio-group-label"
                    value={formik.values.wallet_type_id}
                    onChange={(_, value) =>
                      formik.setFieldValue("wallet_type_id", parseInt(value))
                    }
                  >
                    <FormControlLabel
                      label={t("unlimited")}
                      value={WALLET_TYPES.unlimited}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      label={t("restricted")}
                      value={WALLET_TYPES.restricted}
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <NumberInput
                  required={
                    formik.values.wallet_type_id === WALLET_TYPES.restricted
                  }
                  disabled={
                    formik.values.wallet_type_id === WALLET_TYPES.unlimited
                  }
                  name="wallet_amount"
                  label={t("maxSpendings")}
                  unit={t("sr")}
                  value={formik.values.wallet_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.wallet_amount &&
                    !!formik.errors.wallet_amount
                  }
                  helperText={
                    formik.touched.wallet_amount && formik.errors.wallet_amount
                  }
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  {t("managers")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  name="property_manager_id"
                  label={t("propertyManager")}
                  options={allPropertyManagers.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  noOptionsText={t("noPropertyManagers")}
                  value={formik.values.property_manager_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.property_manager_id &&
                    !!formik.errors.property_manager_id
                  }
                  helperText={
                    formik.touched.property_manager_id &&
                    formik.errors.property_manager_id
                  }
                />
              </Grid>
              {!!formik.values.property_manager_id && (
                <>
                  <Grid item xs={6}>
                    <TextInput
                      name="property_manager_phone"
                      label={t("propertyManagerPhone")}
                      type="tel"
                      fixedValue
                      value={
                        allPropertyManagers.find(
                          (m) => m.id === formik.values.property_manager_id
                        )?.phone || ""
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextInput
                      name="property_manager_email"
                      label={t("propertyManagerEmail")}
                      type="email"
                      fixedValue
                      value={
                        allPropertyManagers.find(
                          (m) => m.id === formik.values.property_manager_id
                        )?.email || ""
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} mt={-2}>
                <Typography variant="body2">
                  {t("didntFoundManager")}{" "}
                  <Link to="/people/add">{t("createNewManager")}</Link>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  required
                  name="area_manager_id"
                  label={t("areaManager")}
                  options={allAreaManagers.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  noOptionsText={t("noAreaManagers")}
                  value={formik.values.area_manager_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.area_manager_id &&
                    !!formik.errors.area_manager_id
                  }
                  helperText={
                    formik.touched.area_manager_id &&
                    formik.errors.area_manager_id
                  }
                />
              </Grid>
              {!!formik.values.area_manager_id && (
                <>
                  <Grid item xs={6}>
                    <TextInput
                      name="area_manager_phone"
                      label={t("areaManagerPhone")}
                      type="tel"
                      fixedValue
                      value={
                        allAreaManagers.find(
                          (m) => m.id === formik.values.area_manager_id
                        )?.phone || ""
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextInput
                      name="area_manager_email"
                      label={t("areaManagerEmail")}
                      type="email"
                      fixedValue
                      value={
                        allAreaManagers.find(
                          (m) => m.id === formik.values.area_manager_id
                        )?.email || ""
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} mt={-2}>
                <Typography variant="body2">
                  {t("didntFoundManager")}{" "}
                  <Link to="/people/add">{t("createNewManager")}</Link>
                </Typography>
              </Grid>
            </Grid>

            <Grid item alignSelf="flex-end">
              <Button
                type="submit"
                color="success"
                onClick={() => setCanLeave(true)}
              >
                {t("saveProperty")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Dialog
        size="small"
        open={leaveDialogOpen}
        title={t("discardChanges")}
        titleColor="error"
        confirmLabel={t("discard")}
        confirmColor="error"
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={() => setCanLeave(true)}
      >
        {t("propertyFormLeaveMessage")}
      </Dialog>
    </Grid>
  );
}

PropertyForm.propTypes = {
  formType: PropTypes.oneOf(["add", "clone", "edit"]).isRequired,
};

export default PropertyForm;
